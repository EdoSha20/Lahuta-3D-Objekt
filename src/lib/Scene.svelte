<script>
  import { T, useThrelte, useTask } from '@threlte/core'
  import { OrbitControls, useGltf } from '@threlte/extras'
  import { Vector3 } from 'three'
  import { get } from 'svelte/store'
  import { HOLZ, FELL, METALL, LICHT } from './optionen.js'

  let {
    config,
    view = null,
    autoRotate = false,
    interactive = true,
    hintergrund = null,
    onloaded,
    onready
  } = $props()

  const gltf = useGltf('/models/lahuta.glb')
  const { renderer, scene, camera } = useThrelte()

  let cam = $state()
  let controls = $state()

  const licht = $derived(LICHT.find((l) => l.id === config.licht) ?? LICHT[0])

  // Beim Laden: Boden ausblenden, Metall etwas heller machen, Bescheid geben
  $effect(() => {
    if (!$gltf) return
    const floor = $gltf.scene.getObjectByName('Floor')
    if (floor) floor.visible = false
    for (const n of ['Metal_Brass', 'Metal_Silver']) {
      const m = $gltf.materials[n]
      if (m) {
        m.metalness = 0.55
        m.roughness = 0.3
      }
    }
    onloaded?.()
  })

  // Farben
  $effect(() => {
    if (!$gltf) return
    const m = $gltf.materials
    m.Wood_Walnut?.color.set(HOLZ.find((h) => h.id === config.holz)?.farbe ?? '#7a5940')
    m.Skin_Goat?.color.set(FELL.find((f) => f.id === config.fell)?.farbe ?? '#e8d6b5')
    m.Metal_Brass?.color.set(METALL.find((x) => x.id === config.metall)?.farbe ?? '#e8cc8a')
  })

  // Form (Morph Targets)
  $effect(() => {
    if (!$gltf) return
    const werte = { Wide_Bowl: config.breit, Deep_Bowl: config.tief, Long_Neck: config.lang }
    $gltf.scene.traverse((obj) => {
      if (!obj.morphTargetDictionary) return
      for (const [name, wert] of Object.entries(werte)) {
        const i = obj.morphTargetDictionary[name]
        if (i !== undefined) obj.morphTargetInfluences[i] = wert
      }
    })
  })

  // Sanfter Kamerawechsel bei Klick auf eine Ansicht
  let ziel = null
  $effect(() => {
    if (view) ziel = { pos: new Vector3(...view.pos), target: new Vector3(...view.target) }
  })
  useTask(() => {
    if (!ziel || !cam || !controls) return
    cam.position.lerp(ziel.pos, 0.08)
    controls.target.lerp(ziel.target, 0.08)
    controls.update()
    if (cam.position.distanceTo(ziel.pos) < 0.005) ziel = null
  })

  // Foto-Funktion für den Konfigurator
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

{#if hintergrund}
  <T.Color attach="background" args={[hintergrund]} />
{/if}

<T.PerspectiveCamera bind:ref={cam} makeDefault position={[0.4, 0.7, 2.6]} fov={40}>
  <OrbitControls
    bind:ref={controls}
    enableDamping
    enableZoom={interactive}
    enablePan={interactive}
    {autoRotate}
    autoRotateSpeed={1.5}
    target={[0.1, 0.5, 0]}
    minDistance={0.5}
    maxDistance={5}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={licht.ambient} color={licht.farbe} />
<T.HemisphereLight intensity={1} />
<T.DirectionalLight position={[2, 3, 3]} intensity={licht.key} color={licht.farbe} />
<T.DirectionalLight position={[-2, 1, -2]} intensity={1} />
<T.DirectionalLight position={[0, -1, 3]} intensity={0.6} />

{#if $gltf}
  <T is={$gltf.scene} />
{/if}