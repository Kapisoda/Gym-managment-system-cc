<template>
  <form enctype="text/plain">
    Name:<br>
    <input type="text" name="name"><br>
    E-mail:<br>
    <input type="text" name="mail"><br>
    Subject:<br>
    <input type="text" name="subject"><br>
    Message:<br>
    <input type="text" name="message" size="50" class="message_text"><br><br>
    <input type="submit" value="Send">
    <input type="reset" value="Reset">
</form>

</template>

<script>

export default {
  data(){
  name: 'email'
  return {

  }
  }
}

</script>

<style>
.message_text{
  height:200px;
}
</style>
