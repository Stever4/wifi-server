window.onload = function() {
        // create heatmap instance
        var heatmap = h337.create({
          container: document.getElementById('heatmapContainer'),
          // a waterdrop gradient ;-)
          maxOpacity: 0.6,
          radius: 10,
          blur: 0.90
        });

        // boundaries for data generation
        var width = (+window.getComputedStyle(document.body).width.replace(/px/,''));
        var height = (+window.getComputedStyle(document.body).height.replace(/px/,''));

        var generate = function() {
          var max = 100;
          var min = 0;
          var t = [];

          var x = (Math.random()* width) >> 0;
          var y = (Math.random()* height) >> 0;
          var c = 100;
          var r = (Math.random()* 100) >> 0;

          // add the datapoint to heatmap instance
          heatmap.addData({ x: x, y:y, value: c, radius: r});
        };

        // this generates new datapoints in a kind of random timing
        setTimeout(function test() {
          var rand = (Math.random() * 500) >> 0;
          generate();
          setTimeout(test, rand);
        }, 1000);
      };
