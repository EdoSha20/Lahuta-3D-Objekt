<script>
  import { T } from '@threlte/core'
  import { OrbitControls, useGltf } from '@threlte/extras'

  let { onloaded } = $props()

  const gltf = useGltf('/models/lahuta.glb')

  $effect(() => {
    if ($gltf) {
      // Den Boden aus Blender ausblenden
      const floor = $gltf.scene.getObjectByName('Floor')
      if (floor) floor.visible = false
      // Dem Konfigurator Bescheid geben: fertig geladen
      onloaded?.()
    }
  })
</script>

<T.PerspectiveCamera makeDefault position={[0.4, 0.7, 2.6]} fov={40}>
  <OrbitControls
    enableDamping
    target={[0.1, 0.5, 0]}
    minDistance={0.5}
    maxDistance={5}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.8} />
<T.HemisphereLight intensity={1} />
<T.DirectionalLight position={[2, 3, 3]} intensity={2.5} />
<T.DirectionalLight position={[-2, 1, -2]} intensity={1} />

{#if $gltf}
  <T is={$gltf.scene} />
{/if}