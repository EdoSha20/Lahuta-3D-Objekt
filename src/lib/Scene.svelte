
<script>
  import { T, useThrelte, useTask } from '@threlte/core'
  import { OrbitControls, useGltf } from '@threlte/extras'
  import {
    Vector3,
    CanvasTexture,
    SRGBColorSpace,
    Mesh
  } from 'three'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { HOLZ, FELL, METALL, LICHT, VIEWS } from './optionen.js'

  /**
   * @typedef {import('./optionen.js').LahutaConfig} LahutaConfig
   * @typedef {import('three').PerspectiveCamera} PerspectiveCamera
   * @typedef {import('three-stdlib').OrbitControls} OrbitControlsType
   */

  /** @type {{
   * config: LahutaConfig,
   * view?: { pos: [number, number, number], target: [number, number, number], id: number } | null,
   * autoRotate?: boolean,
   * interactive?: boolean,
   * buehne?: boolean,
   * hintergrund?: string,
   * onloaded?: () => void,
   * onready?: (api: { screenshot: () => string }) => void
   * }} */
  let {
    config,
    view = null,
    autoRotate = false,
    interactive = true,
    buehne = true,
    hintergrund = '#201915',
    onloaded,
    onready
  } = $props()

  const gltf = useGltf('/models/lahuta.glb')
  const { renderer, scene, camera } = useThrelte()

  const WAND = '#9a7656'

  /** @type {PerspectiveCamera | undefined} */
  let cam = $state()

  /** @type {OrbitControlsType | undefined} */
  let controls = $state()

  /** @type {CanvasTexture | null} */
  let teppich = $state(null)

  /** @type {CanvasTexture | null} */
  let schatten = $state(null)

  /** @type {{ pos: Vector3, target: Vector3 } | null} */
  let ziel = null

  const licht = $derived(
    LICHT.find((l) => l.id === config.licht) ?? LICHT[0]
  )

  // TEPPICH-TEXTUR

  /**
   * @param {CanvasRenderingContext2D} g
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {string} farbe
   */
  function raute(g, x, y, r, farbe) {
    g.fillStyle = farbe
    g.beginPath()
    g.moveTo(x, y - r)
    g.lineTo(x + r, y)
    g.lineTo(x, y + r)
    g.lineTo(x - r, y)
    g.closePath()
    g.fill()
  }

  function teppichTextur() {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 693

    const g = c.getContext('2d')
    if (!g) throw new Error('Canvas 2D nicht verfügbar')

    g.fillStyle = '#6b0d0a'
    g.fillRect(0, 0, 1024, 693)

    g.fillStyle = '#d1bd94'
    g.fillRect(28, 28, 968, 637)

    g.fillStyle = '#6b0d0a'
    g.fillRect(56, 56, 912, 581)

    for (let i = 0; i < 5; i++) {
      const x = 512 + (i - 2) * 170
      raute(g, x, 346, 76, '#0a0908')
      raute(g, x, 346, 36, '#d1bd94')
    }

    for (let i = 0; i < 14; i++) {
      const x = 90 + i * 66.5
      raute(g, x, 92, 14, '#d1bd94')
      raute(g, x, 601, 14, '#d1bd94')
    }

    const t = new CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    t.anisotropy = 8
    return t
  }

  // SCHATTEN-TEXTUR

  function schattenTextur() {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 256

    const g = c.getContext('2d')
    if (!g) throw new Error('Canvas 2D nicht verfügbar')

    const v = g.createRadialGradient(
      128, 128, 0, 128, 128, 128
    )

    v.addColorStop(0, 'rgba(15,8,4,0.6)')
    v.addColorStop(1, 'rgba(15,8,4,0)')

    g.fillStyle = v
    g.fillRect(0, 0, 256, 256)

    return new CanvasTexture(c)
  }

  onMount(() => {
    teppich = teppichTextur()
    schatten = schattenTextur()

    return () => {
      teppich?.dispose()
      schatten?.dispose()
    }
  })

  // 3D-MODELL LADEN

  $effect(() => {
    if (!$gltf) return

    const floor = $gltf.scene.getObjectByName('Floor')
    if (floor) floor.visible = false

    for (const n of ['Metal_Brass', 'Metal_Silver']) {
      const m = $gltf.materials[n]

      if (m && 'metalness' in m && 'roughness' in m) {
        m.metalness = 0.55
        m.roughness = 0.3
      }
    }

    onloaded?.()
  })

  // MATERIALFARBEN

  $effect(() => {
    if (!$gltf) return

    const m = $gltf.materials

    m.Wood_Walnut?.color.set(
      HOLZ.find((h) => h.id === config.holz)?.farbe ?? '#7a5940'
    )

    m.Skin_Goat?.color.set(
      FELL.find((f) => f.id === config.fell)?.farbe ?? '#e8d6b5'
    )

    m.Metal_Brass?.color.set(
      METALL.find((x) => x.id === config.metall)?.farbe ?? '#e8cc8a'
    )
  })

  // MORPH TARGETS – SICHTBARE FORMVERÄNDERUNG

  $effect(() => {
    if (!$gltf) return

    const werte = {
      Wide_Bowl: config.breit,
      Deep_Bowl: config.tief,
      Long_Neck: config.lang
    }

    $gltf.scene.traverse((obj) => {
      if (!(obj instanceof Mesh)) return

      const dictionary = obj.morphTargetDictionary
      const influences = obj.morphTargetInfluences

      if (!dictionary || !influences) return

      for (const [name, wert] of Object.entries(werte)) {
        const i = dictionary[name]

        if (i !== undefined) {
          influences[i] = wert
        }
      }
    })
  })

  // SANFTER KAMERAWECHSEL

  $effect(() => {
    if (!view) return

    ziel = {
      pos: new Vector3(...view.pos),
      target: new Vector3(...view.target)
    }
  })

  useTask(() => {
    if (!ziel || !cam || !controls) return

    cam.position.lerp(ziel.pos, 0.08)
    controls.target.lerp(ziel.target, 0.08)
    controls.update()

    if (
      cam.position.distanceTo(ziel.pos) < 0.005 &&
      controls.target.distanceTo(ziel.target) < 0.005
    ) {
      ziel = null
    }
  })

  // SCREENSHOT

  $effect(() => {
    onready?.({
      screenshot: () => {
        const c = camera.current ?? get(camera)
        renderer.render(scene, c)
        return renderer.domElement.toDataURL('image/png')
      }
    })
  })
</script>

{#if buehne}
  <T.Color attach="background" args={[WAND]} />
  <T.Fog attach="fog" args={[WAND, 5, 14]} />

  <!-- Boden -->
  <T.Mesh rotation.x={-Math.PI / 2} position.y={-0.04}>
    <T.CircleGeometry args={[40, 64]} />
    <T.MeshStandardMaterial color={WAND} roughness={1} />
  </T.Mesh>

  <!-- Originaler Kilim-Teppich -->
  {#if teppich}
    <T.Mesh rotation.x={-Math.PI / 2} position={[0.15, -0.037, 0.05]}>
      <T.PlaneGeometry args={[1.7, 1.15]} />
      <T.MeshStandardMaterial map={teppich} roughness={0.95} />
    </T.Mesh>
  {/if}

  <!-- Weicher Schatten -->
  {#if schatten}
    <T.Mesh
      rotation.x={-Math.PI / 2}
      position={[0.17, -0.0355, 0.02]}
      renderOrder={1}
    >
      <T.PlaneGeometry args={[1.1, 0.55]} />
      <T.MeshBasicMaterial
        map={schatten}
        transparent
        depthWrite={false}
      />
    </T.Mesh>
  {/if}
{:else}
  <T.Color attach="background" args={[hintergrund]} />
{/if}

<!-- KAMERA -->
<T.PerspectiveCamera
  bind:ref={cam}
  makeDefault
  position={VIEWS[0].pos}
  fov={38}
>
  <OrbitControls
    bind:ref={controls}
    enableDamping
    enableZoom={interactive}
    enablePan={interactive}
    {autoRotate}
    autoRotateSpeed={1.5}
    target={VIEWS[0].target}
    minDistance={0.5}
    maxDistance={4.5}
    maxPolarAngle={Math.PI / 2 - 0.05}
  />
</T.PerspectiveCamera>

<!-- BELEUCHTUNG -->
<T.AmbientLight intensity={licht.ambient} color={licht.farbe} />
<T.HemisphereLight intensity={0.6} />

<T.DirectionalLight
  position={[-1.7, 1.7, 1.9]}
  intensity={licht.key}
  color={licht.farbe}
/>

<T.DirectionalLight
  position={[2, 0.8, 1.5]}
  intensity={0.9}
  color="#d9e6ff"
/>

<T.DirectionalLight
  position={[0.9, 1.5, -1.2]}
  intensity={1.4}
  color="#fff0d2"
/>

<!-- LAHUTA -->
{#if $gltf}
  <T is={$gltf.scene} rotation.y={-0.3} />
{/if}
