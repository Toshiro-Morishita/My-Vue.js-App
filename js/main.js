(function() {
  'use strict';

  let vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: {
      // todos: function() {
      //   localStorage.setItem('todos', JSON.stringify(this.todos));
      //   alert('Data saved!');
      // }
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saved!');
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function() {
        let item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if (!confirm('delete finished?')) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });

  // component

  let likeComponent = Vue.extend({
    props: {
      message: {
        type: String,
        default: 'Like'
      }
    },
    data: function() {
      return {
        count: 0
      }
    },
    template: '<button @click="countUp">{{ message }} {{ count }}</button>',
    methods: {
      countUp: function() {
        this.count++;
        this.$emit('increment');
      }
    }
  });

  let app = new Vue({
    el: '#like',
    components: {
      'like-component': likeComponent
    },
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function() {
        this.total++;
      }
    }
  });

})();
