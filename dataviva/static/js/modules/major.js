window.showGraph = function(major, location, tab) {
    if ($('#graphs #graphs-' + tab).length === 0) {
        $.ajax({
            method: "POST",
            url: major+"/graphs/"+tab+"?bra_id="+location,
            success: function (graphs) {
                $('#graphs').append(graphs);
            }
        });
    }
    $("#graphs").children().hide();
    $('#graphs #graphs-' + tab).show();
}

$(document).ready(function () {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();

                if (width >= 600) {
                    width = 200;
                } else if (width >= 350) {
                    width = 170;
                }

                carousel.jcarousel('items').css('width',width);
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev').jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-control-next').jcarouselControl({
            target: '+=1'
        });
    });

    if(document.location.hash) {
        var tab = document.location.hash.substring(1),
            major = document.location.pathname.split('/')[3],
            location = getParameterByName('bra_id');

        $('[href=#' + tab + ']').tab('show');

        showGraph(major, location, tab);
    }

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if ($(this).attr('graph') != null) {
            var major = this.dataset.major,
                location = this.dataset.location,
                tab = $(this).attr('aria-controls');

            showGraph(major, location, tab);
        }
    });
});