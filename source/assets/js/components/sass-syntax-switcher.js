$(function() {
  $(".code-example").each(function() {
    var figure = $(this);

    figure.tabs({
      active: 0,
      beforeActivate: function(event, ui) {
        // If multiple panels are visible, the CSS tab shouldn't be clickable.
        if (ui.newPanel.hasClass('css') &&
            allPanels.filter(":visible").length > 1) {
          return false;
        }
      },
      activate: function(event, ui) {
        if (ui.newPanel.hasClass('css')) {
          figure.addClass('ui-tabs-panel-css-is-active');
        } else {
          figure.removeClass('ui-tabs-panel-css-is-active');
        }

        allPanels.removeClass('ui-tabs-panel-previously-active');
        ui.oldPanel.addClass('ui-tabs-panel-inactive').addClass('ui-tabs-panel-previously-active');
        ui.newPanel.removeClass('ui-tabs-panel-inactive');
        allPanels.css('display', '');
      }
    });
    var allPanels = figure.find(".ui-tabs-panel");
    allPanels.css('display', '');
  });

  // Switch ALL the tabs (Sass/SCSS) together
  var
    noRecursion = false,
    jqA = $( "a.ui-tabs-anchor" ),
    jqASass = jqA.filter( ":contains('Sass')" ).click(function() {
      if ( !noRecursion ) {
        noRecursion = true;
        jqASass.not( this ).click();
        noRecursion = false;
      }
    }),
    jqASCSS = jqA.filter( ":contains('SCSS')" ).click(function() {
      if ( !noRecursion ) {
        noRecursion = true;
        jqASCSS.not( this ).click();
        noRecursion = false;
      }
    })
  ;
});
