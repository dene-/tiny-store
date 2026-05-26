<script lang="ts">
  let { onLogin }: { onLogin: () => void } = $props();
</script>

<div class="flex flex-col items-center gap-3">
  <h1 class="text-2xl font-bold">Bienvenido, Invitado</h1>
  <div class="text-lg">
    Por favor
    <button
      class="btn btn-primary mx-3"
      onclick={onLogin}
    >
      iniciar sesión
    </button>
    para ver los detalles de tu cuenta.
  </div>
</div>
