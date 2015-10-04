$(document).ready(function(){
    function Books() {
        this.allBooks = {};
        this.BooksCount = 0;

        this.run = function() {
            var BooksCount = 0;
            if (this.getBooks()!=null) {
                this.clearRightSide();
                this.allBooks = this.getBooks();
                $.each(this.allBooks, function (index, value) {
                    BooksCount = parseInt(index);
                    uBooks.addBookToList(index,value.author,value.name);
                });
                this.BooksCount = BooksCount;
            }
        };

        this.getBooks = function() {
            return JSON.parse(localStorage.getItem('books'));
        };
        this.setBook = function(type) {
            var Form=$('#addForm');
            var index = parseInt(this.BooksCount+1);

            if (type=='edit') {
                Form = $('#editForm');
                index = parseInt(Form.find('#editId').val());
                this.hideEdit();
            }

            this.allBooks[index] =
            {
                author: Form.find('input[name=author]').val(),
                year:   Form.find('input[name=year]').val(),
                name:   Form.find('input[name=name]').val(),
                length: Form.find('input[name=length]').val()
            };

            localStorage.setItem('books', JSON.stringify(this.allBooks));

            this.clearEditForm();
            this.run();
        };
        this.deleteBook = function(index) {
            delete (this.allBooks[index]);
            localStorage.setItem('books', JSON.stringify(this.allBooks));
            this.run();
        };
        this.addBookToList = function(index,author,name) {
            var elem = '<div class="book" id="'+index+'"><p>'+
                author+'<br>'+
                name + '</p>'+
                '<input type="button" class="editBook myButton" value="Редактировать">'+
                '<input type="button" class="deleteBook myButton" value="Удалить">'+
                '</div>';
            $('#rightSide').append(elem);
        };

        this.clearRightSide = function() {
            $('#rightSide').html('');
        };
        this.clearEditForm = function() {
            $.each($('#addForm input'), function () {$(this).val('') });
        };
        this.showEdit = function(index) {
            $('#wrapper').css('opacity','0');
            var book = this.allBooks[index];
            var editForm=$('#editForm');
            editForm.find('input[name=author]').val(book.author);
            editForm.find('input[name=year]').val(book.year);
            editForm.find('input[name=name]').val(book.name);
            editForm.find('input[name=length]').val(book.length);
            editForm.find('#editId').val(index);
            editForm.show();
        };
        this.hideEdit = function() {
            $('#editForm').hide();
            $('#wrapper').css('opacity','1');
        }

    }


    uBooks = new Books();
    uBooks.run();

    $('#addBook').on('click',function(){
        uBooks.setBook();
    });

    $('body').on('click','.editBook',function(){
        var index=$(this).parent().attr('id');
        uBooks.showEdit(index);
    });

    $('#editBook').on('click',function(){
        uBooks.setBook('edit');
    });

    $('body').on('click','.deleteBook',function(){
        var index = $(this).parent().attr('id');
        uBooks.deleteBook(index);
    });

    $('#closeEdit').click(function(){
        uBooks.hideEdit();
    });


});
