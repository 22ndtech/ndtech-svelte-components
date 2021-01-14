<script>
  import { onMount } from 'svelte'
  import { Context } from '../Context/Context'
  import { getCookie } from '../Cookies/Cookies'

  export let session;

  let userName = ''

  onMount(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    let userName = urlSearchParams.get('userName')
    const id = urlSearchParams.get('_id')
    const cookie = getCookie('id_token')

    const user = {"_id": id, "username": userName, token: cookie};

    session.user = user;
    session.set(session);
    Context.user = user;
    Context.set(Context);
  })
</script>

<h1>Welcome to 22ndtech {userName}</h1>
