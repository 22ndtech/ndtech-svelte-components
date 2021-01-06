<script>
  import { onMount } from 'svelte'
  import { Context } from '../Context/Context'

  export let session;

  let userName = ''

  function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

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
