function PagesManager() {

	var self = this;

    this.init = function init() {
        self.initPages();

        self.pageOrder = ['pageLanding', 'pageTableauVecinoIntro', 'pageTableauVecinoElegir', 'pageReforMadApp', 'pageTableauVecinoProblema', 'pageTableauVecinoGrupo', 'pageTableauBarrenderoIntro', 'pageTableauBarrenderoRanking', 'pageTableauBarrenderoMapa', 'pageFin'];

        self.goToPage(self.pageOrder[0]);
    };

    this.initPages = function initPages() {
    	$pages = $('.demoPage');
        //console.log('$Pages: %O', $pages);

        var page;
        var id;
        self.pages = {};
        self.pageCount = $pages.length;
        for (var i = 0; i < self.pageCount; i++) {
            page = $pages[i];
            id = $(page).attr('id');

            self.pages[id] = page;
        }
        console.log('PagesManager.pages: %O', self.pages);
    }

    this.goToPage = function goToPage(targetPageId) {
    	console.log('PagesManager.goToPage(targetPageId: %O)', targetPageId);
        self.targetPageId = targetPageId;
    	var $page;
    	var page;
    	for(pageId in self.pages) {
    		$page = $(self.pages[pageId]);
    		if(pageId == targetPageId) {
    			self.pageActual = pageId;
                //Crazy delay cascade from: http://stackoverflow.com/questions/3473230/jquery-delay-not-delaying-the-html-function
                $('#sectionHeader')
                    .fadeOut()
                    .delay(500)
                    .queue(function(n) {
                        $(this).html($('#' + self.targetPageId + ' .demoPageHeader h1').html());
                        n();
                    })
                    .fadeIn();
                $('#sectionDescription')
                    .fadeOut()
                    .delay(500)
                    .queue(function(n) {
                        $(this).html($('#' + self.targetPageId + ' .demoPageHeader p').html());
                        n();
                    })
                    .fadeIn();
                //$('#sectionDescription').html($('#' + pageId + ' .demoPageHeader p').html());
    			$page.delay(400).fadeIn();
    		} else {
    			$page.fadeOut();
    		}
    	}
    }

    this.goToNext = function goToNext() {
    	var pageActualIndex = self.pageOrder.indexOf(self.pageActual);

    	var pageTargetIndex = (pageActualIndex + 1) % self.pageCount;

    	self.goToPage(self.pageOrder[pageTargetIndex]);
    }

    this.goToPrevious = function goToPrevious() {
    	var pageActualIndex = self.pageOrder.indexOf(self.pageActual);

    	var pageTargetIndex = (pageActualIndex - 1) % self.pageCount;
    	if(pageTargetIndex < 0) pageTargetIndex = self.pageCount -1

    	self.goToPage(self.pageOrder[pageTargetIndex]);
    }

    this.init();
}

var demo_wizard;
$(document).ready(function() {
    console.log('Document is ready');

    pagesManager = new PagesManager();
    /*
    demo_wizard = {};
    demo_wizard.header = {};
    demo_wizard.header.onAnteriorClick = function() {
    	pagesManager.goToNext();
    }
    demo_wizard.header.onSiguienteClick = function() {
    	alert('Other test');
    }
    */
});