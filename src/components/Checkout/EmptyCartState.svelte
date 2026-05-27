<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<p
  class="text-center text-lg font-medium"
  role="alert"
>
  Tu carrito está vacío. Vuelve a <a
    href={resolve('/')}
    class="text-primary font-bold"
    aria-label="Volver a la tienda">la tienda</a
  >.
</p>
