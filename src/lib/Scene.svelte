<script>
  import { T } from '@threlte/core'
  import { OrbitControls, useGltf } from '@threlte/extras'

  let { config, onloaded } = $props()

  const gltf = useGltf('/models/lahuta.glb')

  const HOLZ = { walnuss: '#7a5940', ahorn: '#dbbb8a', kirsche: '#b3694d', ebenholz: '#262120' }
  const FELL = { ziege: '#e8d6b5', schaf: '#f2ebd9', kalb: '#c4a17a' }
  const METALL = { messing: '#e8cc8a', silber: '#eeeef0', kupfer: '#d98f6a' }

  // Beim Laden: Boden ausblenden, Bescheid geben
  $effect(() => {
    if (!$gltf) return
    const floor = $gltf.scene.getObjectByName('Floor')
    if (floor) floor.visible = false
    onloaded?.()
  })

  // Material-Farben ändern
  $effect(() => {
    if (!$gltf) return
    const m = $gltf.materials
    m.Wood_Walnut?.color.set(HOLZ[config.holz])
    m.Skin_Goat?.color.set(FELL[config.fell])
    m.Metal_Brass?.color.set(METALL[config.metall])
  })

  // Form ändern (Morph Targets)
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
</script>

<T.PerspectiveCamera makeDefault position={[0.4, 0.7, 2.6]} fov={40}>
  <OrbitControls enableDamping target={[0.1, 0.5, 0]} minDistance={0.5} maxDistance={5} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.8} />
<T.HemisphereLight intensity={1} />
<T.DirectionalLight position={[2, 3, 3]} intensity={2.5} />
<T.DirectionalLight position={[-2, 1, -2]} intensity={1} />

{#if $gltf}
  <T is={$gltf.scene} />
{/if}