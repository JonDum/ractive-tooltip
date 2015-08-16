
require('./styles');

var container;

function positionTooltip(event, anchor, tooltip) {
    // Keep the tooltip near where the mouse is
    var mousePos = {x: event.pageX, y: event.pageY};

    var topClip = mousePos.y - tooltip.offsetHeight - 5;
    var rightClip = mousePos.x + tooltip.offsetWidth - window.innerWidth;

    var top = (event.pageY - tooltip.offsetHeight - 5);
    var left = event.pageX - 5;

    if(rightClip > 0) 
        left -= rightClip;

    if(topClip < 0)
        top += tooltip.offsetHeight*2 - 5;

    tooltip.style.left = left + 'px';
    tooltip.style.top =  top + 'px';
}

function tooltipDecorator(node, content, direction) {

    var tooltip, handlers, eventName;

    direction = direction || 'above';

    //TODO impl other directions
    
    if(!container) {
        container = document.createElement('div');
        container.className = 'ractive-tooltip-container';
        document.body.appendChild(container);
    }

    handlers = {
        mouseenter: function(event) {

            if(!tooltip)
            {
                // Create a tooltip...
                tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = content;
            }

            node.classList.add('tooltipped');

            if(!container.contains(tooltip))
                container.appendChild(tooltip);

            positionTooltip(event, node, tooltip);
        },

        mousemove: function(event) {
            if(!tooltip)
                return;
            positionTooltip(event, node, tooltip);
        },

        mouseleave: function() {

            if(!tooltip || !tooltip.parentNode)
                return;

            // Upheave the tooltip when the mouse leaves the node
            tooltip.parentNode.removeChild(tooltip);

            //ensure node is position relative
            node.classList.remove('tooltipped');
        }
    };

    // Add event handlers to the node
    for(eventName in handlers) {
        if(handlers.hasOwnProperty(eventName)) {
            node.addEventListener(eventName, handlers[eventName], false);
        }
    }

    // Return an object with a `teardown()` method that removes the
    // event handlers when we no longer need them
    return {
        teardown: function() {
            if(tooltip && tooltip.parentNode)
            {
                tooltip.parentNode.removeChild(tooltip);
                tooltip = null;
            }
            for(eventName in handlers) {
                if(handlers.hasOwnProperty(eventName)) {
                    node.removeEventListener(eventName, handlers[eventName], false);
                }
            }
        }
    };
};

module.exports = tooltipDecorator;
