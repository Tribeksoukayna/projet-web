
        const url = "http://localhost:3000/articles?skip=0&take=10";
        $articlesContainer = $(".cntn > .articles");
        function show(data) {
            const $card = $(".template > .post-card ");
            data.forEach((e) => {
                const $col = $('<div class = "col-lg-3 col-md-3 articlesDiv"></div>');
                const $clone = $card.clone(true);
                const src = $("img", $clone).attr("src");
                $("#img", $clone).attr('src', e.image + '?'+e.id)
                $(".title", $clone).text(e.title);
                let s=e.content
                $(".content", $clone).text(s);
                $(".cat", $clone).text(e.categorId);
                $a=$(`<a class="btn  text-white idDetails" style='background-color:pink' onclick="coment(${e.id})">Read more...</a>`)
                 $clone.append($a)           
                $col.append($clone).appendTo($articlesContainer);
            });
        }
        $.getJSON(url).then(show);
        // login
        function coment(id){

            
            console.log(id)
            const url = "http://localhost:3000/articles/"+id;
            $.getJSON(url).then(comentDetails);
            
        }
       function comentDetails(e){
        $(".articles").hide()
            $soukayna=$(".soukayna")
            
            const $card = $(".template-show > .card ");
            const $col = $('<div class = "col-lg-12 col-md-12 articlesDetails"></div>');
            const $clone = $card.clone(true);
            $(".idDetails", $clone).attr('id', e.id)
            $("#imgimg", $clone).attr('src', e.image + '?' + e.id)
            $(".details", $clone).text(e.title);
            $(".content_cont", $clone).text(e.content);
            $col.append($clone).appendTo($soukayna);
            
            $news=$(".newslettre")
            $(".social-icones",$news).remove()
            $(".newslettre-width").html(`Commentaire <form action="#" class="newslettre-form">
                    <div class="form-flex">
                        <div class="form-group">
                            <input type="text" class="form-control" id="coom" placeholder="Your comment " required="required">
                        </div>
                        <a class='submit-btn text-white' onclick='add(${e.id})' >commenter</a>
                    </div>
                </form>`) 

            $url = "http://localhost:3000/commentaires/" + e.id
            $.getJSON($url).then(showComent);

            
       }
       function add(id){
        
        $data=$("#coom")

        $.ajax(
       {
           type:"POST",
           url:"/commentaires",
           data:{
               comment:$data.val(),
               postId:id,
               writtenById:1
           },
           success:function(r){
               addMore(r)
           }
       }
        )
       }
       function addMore(e){
        $soukayna=$(".soukayna")
        $cln=$(`<div class="col-md-4">
            <h6 class="owner">rch</h6>
            <p id="detsoukayna">sqhqr</p>
            <hr>
            </div>
            `)
            $("#detsoukayna", $cln).text(e.comment);
            $(".owner", $cln).text("inconnu");
            $cln.appendTo($soukayna)
       }
       




       function showComent(data) {
            $ar = $('.article-details')
            $card = $(".template-comment > div")
            data.forEach((e) => {
                const $clone1 = $card.clone(true);
                $('.owner', $clone1).text(e.writtenById)
                $('#detsoukayna', $clone1).text(e.comment)
                $clone1.appendTo($ar);
            });
        }
