define([], function () {

    function ePtBR(x){
        return x.toLocaleString('pt-BR');
    }

    function getDate(x){
        return new Date(x).toLocaleDateString('pt-br');
    }

    function getTime(x){
        return new Date(x).toLocaleTimeString('pt-br');
    }

    function getDateTime(x){
        return getDate(x) + " " +getTime(x);
    }

    function getCurrency(x){
        return x.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    function generateEntryItem(item) {
       var template = $('#entry-card').html();
       template = template.replace('{{Entry.Id}}', item.id);
       template = template.replace('{{Entry.Description}}', item.description);
       template = template.replace('{{Entry.Category}}', item.category);
       template = template.replace('{{Entry.CategoryDescription}}', item.categoryDescription);
       template = template.replace('{{Entry.Value}}', getCurrency(item.value) );
       template = template.replace('{{Entry.Date}}',  getDateTime(item.date) );
       template = template.replace('{{Entry.Link}}', item.link);
       template = template.replace('{{Link}}', item.link);
       template = template.replace('{{Entry.Total}}', getCurrency(item.total));
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
       template = template.replace('{{Entry.Date}}',  getDateTime(item.date) );
       template = template.replace('{{Entry.Link}}', item.link);
       template = template.replace('{{Entry.Total}}', ePtBR(item.total));
       $('#entry-item-container').html(template);
       document.querySelector('.entry-item-close')
           .addEventListener('click', function(){
               document.getElementById('entry-item-container').innerHTML = '';
           }); 
    }
    
    return {
        appendEntryList: appendEntryList,
        showEntryItem: showEntryItem
    };
});