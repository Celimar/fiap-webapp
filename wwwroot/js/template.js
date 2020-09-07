define([], function () {

    function ePtBR(x){
        return x.toLocaleString('pt-BR');
      }

    function generateEntryItem(item) {
        var template = $('#entry-card').html();
        template = template.replace('{{Entry.Id}}', item.id);
        template = template.replace('{{Entry.Description}}', item.description);
        template = template.replace('{{Entry.Category}}', item.category);
        template = template.replace('{{Entry.CategoryDescription}}', item.categoryDescription);
        template = template.replace('{{Entry.Value}}', ePtBR(item.value) );
        template = template.replace('{{Entry.Date}}', ePtBR(item.date).toLocaleString() );
        template = template.replace('{{Entry.Link}}', item.link);
        template = template.replace('{{Entry.Total}}', ePtBR(item.total));
        return template;
    
    }

    function appendEntryList(items) {
        var cardHtml = '';
        for (var i = 0; i < items.length; i++) {
            cardHtml += generateEntryItem(items[i]);
        }

        $('.entry-list').append(cardHtml);
    }

    function showEntryItem(html, link) {
        var template = $('#entry-item').html();
        template = template.replace('{{Entry.Id}}', item.id);
        template = template.replace('{{Entry.Description}}', item.description);
        template = template.replace('{{Entry.Category}}', item.category);
        template = template.replace('{{Entry.CategoryDescription}}', item.categoryDescription);
        template = template.replace('{{Entry.Value}}', ePtBR(item.value) );
        template = template.replace('{{Entry.Date}}', ePtBR(item.date).toLocaleString() );
        template = template.replace('{{Entry.Link}}', item.link);
        template = template.replace('{{Entry.Total}}', ePtBR(item.total));
        $('#entry-item-container').html(template);
        document.querySelector('.entry-item-close')
            .addEventListener('click', function(){
                document.getElementById('entry-item-container').innerHTML = '';
            }); 
    }



    function generateBlogItem(item) {
        var template = $('#blog-card').html();
        template = template.replace('{{PostId}}', item.postId);
        template = template.replace('{{Title}}', item.title);
        template = template.replace('{{ShortDescription}}', item.shortDescription);
        template = template.replace('{{Link}}', item.link);
        return template;
    }

    function appendBlogList(items) {
        var cardHtml = '';
        for (var i = 0; i < items.length; i++) {
            cardHtml += generateBlogItem(items[i]);
        }

        $('.blog-list').append(cardHtml);
    }

    function showBlogItem(html, link) {
        var template = $('#blog-item').html();
        template = template.replace('{{Link}}', link);
        template = template.replace('{{Link}}', link);        
        template = template.replace('{{Content}}', html);
        $('#blog-item-container').html(template);
        document.querySelector('.blog-item-close')
            .addEventListener('click', function(){
                document.getElementById('blog-item-container').innerHTML = '';
            }); 
    }

    return {
        appendBlogList: appendBlogList,
        showBlogItem: showBlogItem,

        appendEntryList: appendEntryList,
        showEntryItem: showEntryItem
    };
});