<template>
  <div>
    <div>
      <pie-chart 
      :data="[
          ['Unfinish Task', unFinishTask],
          ['Finish', finishTask], 
          ['Total Task', totalTask]
        ]">
      </pie-chart>
    </div>
    <p>Unfinish Task: {{ unFinishTask }}</p>
    <p>Finish Task: {{ finishTask }}</p>
    <p>Total Task: {{ totalTask }}</p>
    <q-btn label="Generate PDF" @click="generatePDF"></q-btn>
  </div>
</template>
<script>
import jsPDF from 'jspdf'

var doc = new jsPDF()

export default {
  props: {
    unFinishTask: {
      type: Number,
      default: 0
    },
    finishTask: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalTask () {
      return this.unFinishTask + this.finishTask
    }
  },
  methods: {
    generatePDF () {
    //   function toDataURL(url, callback) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     var reader = new FileReader();
    //     reader.onloadend = function() {
    //       callback(reader.result);
    //     }
    //     reader.readAsDataURL(xhr.response);
    //   };
    //   xhr.open('GET', url);
    //   xhr.responseType = 'blob';
    //   xhr.send();
    // }

    // toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
    //   console.log('RESULT:', dataUrl)
    // })
      doc.text('Hello world!', 10, 10)
      doc.save('a4.pdf')
    }
  }
}
</script>