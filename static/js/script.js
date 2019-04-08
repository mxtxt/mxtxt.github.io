$(document).ready(function(){
  $("button#theme3").click(function(){
    $("#original").attr("href", "{{ url_for('static', filename='css/style3.css') }}");
  });
});
