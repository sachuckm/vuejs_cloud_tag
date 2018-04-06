/* eslint-disable */
<template lang="html">
  <div>
   <div id='vue-tag-cloud' class='vue-tag-cloud'></div>
  </div>
</template>

<script>
const WEIGHTS_LENGTH = 10;

export default {
  props: {
    data: {
      type: Array
    }
  },
  
  data() {
    return {
      word_array: this.data,
      cloud_namespace: Math.floor(Math.random() * 1000000).toString(36),
      options: {
        width: "600",
        height: "500",
        center: {
          x: 600 / 2.0,
          y: 500 / 2.0
        },
        shape: false,
        removeOverflowing: false,
        word_span: null,
        weights: 0
      },
      already_placed_words: []
    };
  },
  watch: {
    data (newValue) {
      //this.word_span.innerHTML = "";
      document.getElementById("vue-tag-cloud").innerHTML = "";
      this.word_array = [];
      //this.already_placed_words = [];
       this.word_array = newValue.forEach(
      (elem, index) => {
        
        this.drawOneWord(index, elem);
      });
    }
  },
  mounted() {
    this.word_array.forEach(
      function(elem, index) {
        this.drawOneWord(index, elem);
      }.bind(this)
    );
  },
  methods: {
    hitTest(elem, other_elems) {
      var overlapping = function(a, b) {
        if (
          Math.abs(
            2.0 * a.offsetLeft +
              a.offsetWidth -
              2.0 * b.offsetLeft -
              b.offsetWidth
          ) <
          a.offsetWidth + b.offsetWidth
        ) {
          if (
            Math.abs(
              2.0 * a.offsetTop +
                a.offsetHeight -
                2.0 * b.offsetTop -
                b.offsetHeight
            ) <
            a.offsetHeight + b.offsetHeight
          ) {
            return true;
          }
        }
        return false;
      };
      var i = 0;
      // Check elements for overlap one by one, stop and return false as soon as an overlap is found
      for (i = 0; i < other_elems.length; i++) {
        if (overlapping(elem, other_elems[i])) {
          return true;
        }
      }
      return false;
    },
    drawOneWord(index, word) {
      // Define the ID attribute of the span that will wrap the word, and the associated jQuery selector string
      var word_id = this.cloud_namespace + "_word_" + index,
        word_selector = "#" + word_id,
        angle = 6.28 * Math.random(),
        radius = 0.0,
        // Only used if option.shape == 'rectangular'
        steps_in_direction = 0.0,
        quarter_turns = 0.0,
        weight = 5,
        custom_class = "",
        inner_html = "",
        word_span = this.word_span;

      // Check if min(weight) > max(weight) otherwise use default
     /* if (
        this.word_array[0].weight >
        this.word_array[this.word_array.length - 1].weight
      ) {
        // Linearly map the original weight to a discrete scale from 1 to 10
        weight =
          Math.round(
            (word.weight - this.word_array[this.word_array.length - 1].weight) /
              (this.word_array[0].weight -
                this.word_array[this.word_array.length - 1].weight) *
              (WEIGHTS_LENGTH - 1)
          ) + 1;
      }*/

      // Create a new span and insert node.
      word_span = document.createElement("span");
      weight = Math.floor(Math.random() * 10 + 1)
      //word_span = document.createElement("BUTTON")
      //word_span.className = "w" + weight;
      word_span.className = "w" + weight ;
      word_span.className += ' ' + word.ruleMatchValue.split(' ').join('_');
      word_span.setAttribute("id", word.ruleMatchValue);
     // word_span.className = ;
      //word_span.className += word.ruleFlag;
      
      var textNode = document.createTextNode(word.ruleMatchValue);
        word_span.appendChild(textNode);
        word_span.addEventListener("click", () => {
          this.$emit('onmouseclick', word);
        });
        word_span.addEventListener("mouseover", () => {
           this.$emit('onmouseover', word);
        })
        document.getElementById("vue-tag-cloud").appendChild(word_span);
       /* document.addEventListener("click", () => {
          this.$emit('onmouseclick', word)
        });*/
      /*	if(typeof word.link !== 'undefined'){
        // Create a link
          var	word_link = document.createElement("a");
          word_link.setAttribute('href', word.link);
          word_link.appendChild(word_span)
          document.getElementById("vue-tag-cloud").appendChild(word_link);
        }else{
          //Normal creation
          document.getElementById("vue-tag-cloud").appendChild(word_span);
        }*/

      if (this.options.weights) {
        word_span.style.fontSize = this.options.weights[weight - 1];
      }
      word_span.style.color = word.ruleFlag;

      var width = word_span.offsetWidth,
        height = word_span.offsetHeight,
        left = this.options.center.x - width / 2.0,
        top = this.options.center.y - height / 2.0;

      var word_style = word_span.style;
      word_style.position = "absolute";
      word_style.left = left + "px";
      word_style.top = top + "px";

      var step = this.options.shape === "rectangular" ? 18.0 : 2.0,
        aspect_ratio = this.options.width / this.options.height;

      //Check if tag are hitting each other
      while (this.hitTest(word_span, this.already_placed_words)) {
        // Default settings: elliptic spiral shape
        radius += step;
        angle += (index % 2 === 0 ? 1 : -1) * step;

        left =
          this.options.center.x -
          width / 2.0 +
          radius * Math.cos(angle) * aspect_ratio;
        top = this.options.center.y + radius * Math.sin(angle) - height / 2.0;

        word_style.left = left + "px";
        word_style.top = top + "px";
      }

      // Don't render word if part of it would be outside the container
      if (
        this.options.removeOverflowing &&
        (left < 0 ||
          top < 0 ||
          left + width > options.width ||
          top + height > options.height)
      ) {
        word_span.remove();
        return;
      }

      this.already_placed_words.push(word_span);
    }
  }
};
</script>

<style lang="css">

.vue-tag-cloud {
  position: absolute;
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 10px;
  line-height: normal;
  width: 600px;
  float: left;
  top:100px;
  left:200px;
  display: inline-block;
  //position: relative;
  height: 500px;
 // overflow: hidden;
  //color: #09f;
}

.vue-tag-cloud a {
  font-size: inherit;
  text-decoration: none;
}

.vue-tag-cloud span { padding: 0; }

.vue-tag-cloud span.w10 {
  font-size: 400%;
}
.vue-tag-cloud span.w9 {
  font-size: 380%;
}
.vue-tag-cloud span.w8 {
  font-size: 360%;
}
.vue-tag-cloud span.w7 {
  font-size: 340%;
}
.vue-tag-cloud span.w6 {
  font-size: 320%;
}
.vue-tag-cloud span.w5 {
  font-size: 300%;
}
.vue-tag-cloud span.w4 {
  font-size: 280%;
}
.vue-tag-cloud span.w3 {
  font-size: 260%;
}
.vue-tag-cloud span.w2 {
  font-size: 240%;
}
.vue-tag-cloud span.w1 {
  font-size: 220%;
}
.vue-tag-cloud span.w0 {
  font-size: 200%;
}


.vue-tag-cloud a { color: inherit; }
.vue-tag-cloud a:hover { color: #0df; }
.vue-tag-cloud a:hover { color: #0cf; }

</style>