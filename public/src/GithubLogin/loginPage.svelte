<script>
  export let clientId;
  export let cssClass = 'navbar-link';
</script>

<h1
  class="{cssClass}"
  href={"https://github.com/login/oauth/authorize?client_id=" + clientId}>
  Log in with Github
</h1>
