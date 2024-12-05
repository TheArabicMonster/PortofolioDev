<template>
  <section class="main-content">
    <div>
      <div id="banniere">
        <Banniere />
      </div>
      <div id="recent">
        <OuvrageRecent />
      </div>
    </div>
  </section>
</template>

<script>
import Banniere from '../Partial/Banniere.vue'
import OuvrageRecent from '../Partial/OuvrageRecent.vue'
export default {
  name: 'Home',
  components: {
    Banniere,
    OuvrageRecent
  }
}
</script>

<style scoped>
.main-content {
  flex: 1;
  background-color: #f4f4f9;
  padding: 20px;
}

#banniere {
  margin-top: 20px;
  width: 100%;
}

#recent {
  width: 100%;
  margin-top: 40px;
}
</style>