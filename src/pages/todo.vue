<style>
h1 {
 background-color: pink;
}
</style>

<template>
  <q-page>
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        To do of {{name}}
      </q-toolbar-title>
      <!-- <q-btn flat roumd dense icon="save">Save</q-btn> -->
    </q-toolbar>
    <div class="q-pa-md">

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="unFinishTask" label="Unfinish Task" />
        <q-tab name="finishTask" label="Finish Task" />
        <q-tab name="stats" label="Stats" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="unFinishTask">
          <q-list  bordered class="rounded-borders" style="width: 100%">
         <q-item-section top>
            <div class="row">
              <q-input label="Enter Task" class="col" full-width standout v-model="task" />
              <q-btn color="primary" class="col-3" icon="save" @click="add"> Save</q-btn>
            </div>
          </q-item-section>

        <q-item-label header>To Do List</q-item-label>

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
        </q-tab-panel>

        <q-tab-panel name="finishTask">
          <finish-task></finish-task>
        </q-tab-panel>

        <q-tab-panel name="stats">
          <stats :unFinishTask="tasks.length" :finishTask="finishTask.length"></stats>
        </q-tab-panel>

      </q-tab-panels>

      <q-dialog v-model="isEditDialog" persistent>
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">Description</div>
          </q-card-section>

          <q-card-section>
            <q-input dense v-model="newDescription" autofocus />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Update Description" @click="updateDescription" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import FinishTask from '../pages/FinishTask'
import Stats from '../pages/Stats'


export default {
  components: {
    'finish-task': FinishTask,
    Stats
  },
  mounted () {
    this.$binding('tasks', this.$firestoreApp.collection('tasks').where('isDone', '==', false))
    this.$binding('finishTask', this.$firestoreApp.collection('tasks').where('isDone', '==', true))
  },
  data () {
    return {
      finishTask: [],
      unFinishTask: [],
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