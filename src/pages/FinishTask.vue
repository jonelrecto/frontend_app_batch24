<template>
  <div>
    <q-list  bordered class="rounded-borders" style="width: 100%">
      
    <q-item-label header>Finish Task</q-item-label>

    <q-item v-for="(todo, i) in tasks" :key="i" clickable v-ripple>
      <q-item-section avatar>
        <q-checkbox @input="update(todo)" v-model="todo.isDone" />
      </q-item-section>

      <!-- <q-item-section :style="{
        'text-decoration': todo.isDone ? 'line-through' : ''
      }"> {{todo.desc}}
      </q-item-section> -->

      <q-item-section>
        <p v-if="todo.isDone" style="text-decoration: line-through">{{ todo.desc }}</p>
        <p v-else>{{todo.desc}}</p>
      </q-item-section>

      <q-item-section side top>
        <q-btn flat color="info" label="" icon="mdi-pencil-outline" @click="openEditDialog(todo)"/>
        <q-btn flat color="negative" label="" icon="delete" @click="remove(todo['.key'])" />
      </q-item-section>
    </q-item>

    <q-separator inset="item" />
  </q-list>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.$firebase)
    this.$binding('tasks', this.$firestoreApp.collection('tasks').where('isDone', '==', true))
  },
  data () {
    return {
      tab: 'unFinishTask',
      toEditTask: {},
      isEditDialog: false,
      newDescription: '',
      name: 'Luis',
      task: '',
      val: false,
      tasks: []
    }
  },
  methods: {
    openEditDialog (task) {
      this.toEditTask = task
      this.isEditDialog = true
    },
    updateDescription () {
      var id = this.toEditTask['.key']
      this.$firestoreApp.collection('tasks').doc(id).update({
        desc: this.newDescription
      })
      this.isEditDialog = false
    },
    add () {
      // this.tasks.push ({desc: this.task, isDone: false })
      // this.task=''
      var task = {
        desc: this.task,
        isDone: false,
        isCreated: new Date()
      }
      this.$firestoreApp.collection('tasks').add(task)
      this.task = ''
    },
    remove (key) {
      // this.tasks.splice (index, 1);

      this.$firestoreApp.collection('tasks').doc(key).delete()
        .then(() => {
          console.log(key + 'has been deleted')
        })
        .catch(err => {
          console.log(err, 'error')
        })
    },
    update (task) {
      var id = task['.key']
      console.log(id, 'id')
      this.$firestoreApp.collection('tasks').doc(id).update({
        isDone: task.isDone
      })
    }
  }
 
}
</script>