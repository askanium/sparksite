/**
 * Created by iulian gulea on 11.01.14.
 */

function dom(name, attributes) {
    var node = document.createElement(name);
    if (attributes) {
        forEachIn(attributes, function(name, value) {
            setNodeAttribute(node, name, value);
        });
    }
    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string" || typeof child == "number")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}

function svg(name, attributes) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attributes) {
        forEachIn(attributes, function(name, value) {
            node.setAttribute(name, value);
        });
    }
    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}

function domBufferPenetration(penetration) {
    function domRectangle(className, width) {
        return svg("rect", {"class": className, "width": width+"%", "height": "21", "x": "0"});
    }
    function domBufferTextLabel() {
        return svg("g", {"transform": "translate(5,16.4)"},
            svg("text", {"class": "graph-text"}, penetration+"%")
        );
    }
    return svg("svg", {"width": "100%", "height": "21"},
        domRectangle("graph-red", 100),
        domRectangle("graph-yellow", 66.67),
        domRectangle("graph-green", 33.33),
        domRectangle("graph-measure", penetration),
        domBufferTextLabel()
    );
}

function domClearDiv() {
    return dom("div", {"class": "clear"});
}

function setNodeAttribute(node, attribute, value) {
    if (attribute == "class")
        node.className = value;
    else if (attribute == "checked")
        node.defaultChecked = value;
    else if (attribute == "for")
        node.htmlFor = value;
    else if (attribute == "style")
        node.style.cssText = value;
    else
        node.setAttribute(attribute, value);
}

function domTableHeader(headers) {
    var tableHeader = dom('thead', null, dom('tr'));
    forEach(headers, function(header) {
        tableHeader.appendChild(dom('th', null, header));
    });
    return tableHeader;
}

function tag(name, content, attributes) {
    return {name: name, attributes: attributes, content: content};
}

function link(target, text) {
    return tag("a", [text], {href: target});
}

function htmlDoc(title, bodyContent) {
    return tag("html", [tag("head", [tag("title", [title])]),
        tag("body", bodyContent)]);
}

function td(content, attributes) {
    return tag("td", content, attributes);
}

function clearDiv() {
    return tag("div", [], {"class": "clear"});
}

function bufferTextLabel(penetration) {
    return tag("g", [tag("text", penetration+"%", {"class": "graph-text"})], {transform: "translate(5,16.4)"});
}

function rectangle(className, width) {
    return tag("rect", [], {"class": className, x: 0, height: 24, width: width+"%"});
}

function buffer(penetration) {
    return tag("svg",
        [
            rectangle("graph-red", 100),
            rectangle("graph-yellow", 66.67),
            rectangle("graph-green", 33.33),
            rectangle("graph-measure", penetration),
            bufferTextLabel(penetration)
        ],
        {height: 24, width: "100%"}
    );
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i], i);
}

function forEachIn(object, action) {
    for (var property in object) {
        if (object.hasOwnProperty(property))
            action(property, object[property]);
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function escapeHTML(text) {
    // var replacements = {"<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;"};
    // return text.replace(/[<>&"]/g, function(character) {
    //   return replacements[character];
    // });
    return text;
}

function renderHTML(element) {
    var pieces = [];

    function renderAttributes(attributes) {
        var result = [];
        if (attributes) {
            for (var name in attributes)
                result.push(" " + name + "=\"" +
                    escapeHTML(attributes[name]) + "\"");
        }
        return result.join("");
    }

    function render(element) {
        // Text node
        if (typeof element == "string") {
            pieces.push(escapeHTML(element));
        }
        // Self-closing tag
        else if (!element.content) {
            pieces.push("<" + element.name +
                renderAttributes(element.attributes) + "/>");
        }
        // Empty tag
        else if (!element.content || element.content.length == 0) {
            pieces.push("<" + element.name +
                renderAttributes(element.attributes) + "></" + element.name + ">");
        }
        // Tag with content
        else {
            pieces.push("<" + element.name +
                renderAttributes(element.attributes) + ">");
            forEach(element.content, render);
            pieces.push("</" + element.name + ">");
        }
    }

    render(element);
    // console.log(pieces);
    return pieces.join("");
}

function Dictionary(startValues) {
    this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value, asArray) {
    if (asArray) {
        this.values[name] = [value];
    } else {
        this.values[name] = value;
    }
};
Dictionary.prototype.appendElement = function(name, value) {
    this.values[name].push(value);
};
Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this.values, name) &&
        Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
    forEachIn(this.values, action);
};
Dictionary.prototype.firstFoundKey = function(keyArray) {
    for (var i=0; i<keyArray.length; i++) {
        if (this.contains(keyArray[i])) {
            return keyArray[i];
        }
    }
    return -1;
};

function showTooltip(element, id, tooltipType, message, hideOnMouseLeave) {
    if ($('.'+id).length == 0) {
        var tooltip = dom("div", {"id": "tooltip", "class": tooltipType + " " + id}, message),
//    var tooltip = $(renderHTML(tag("div",[message],{"id": "tooltip", "class": tooltipType}))),
            coordinates = elementCoordinates();

        function elementCoordinates() {
            return {
                top: $(element).offset().top,
                left: $(element).offset().left,
                width: $(element).width(),
                height: $(element).height()
            };
        }

        $("body").append(tooltip);
        console.log($(tooltip).width());
        if ($(window).width() - $(".container").offset().left - $(".container").width() > $(tooltip).width()) {
            $(tooltip).css("top", coordinates.top);
            $(tooltip).css("left", coordinates.left + coordinates.width + 10);
        } else {
            $(tooltip).css("top", coordinates.top + coordinates.height);
            $(tooltip).css("left", coordinates.left + coordinates.width - $(tooltip).width());
        }
        $(tooltip).fadeIn();

        if (hideOnMouseLeave) {
            tooltipVisibility();
        } else {
            setTimeout(function() {
                $("."+id).remove();
            }, 3000);
        }
    }
//    setTimeout(function() {
//        $("#tooltip").remove();
//    }, 3000);


    function tooltipVisibility() {
        $(element).mouseover(function(){
            clearTimeout($("."+id).data('timeoutId'));
            $("."+id).fadeIn("slow");
        }).mouseout(function(){
            var timeoutId = setTimeout(function(){
                $("."+id).fadeOut("fast");
//                $(element).unbind('mouseenter');
//                $(element).unbind('mouseleave');
            }, 1000);
            //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
            $("."+id).data('timeoutId', timeoutId);
        });
    }
}

var cSpeed=11;
var cWidth=60;
var cHeight=60;
var cTotalFrames=12;
var cFrameWidth=60;
var cImageSrc='assets/images/sprites.gif';

var cImageTimeout=false;
var cIndex=0;
var cXpos=0;
var cPreloaderTimeout=false;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){

    document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
    document.getElementById('loaderImage').style.width=cWidth+'px';
    document.getElementById('loaderImage').style.height=cHeight+'px';

    //FPS = Math.round(100/(maxSpeed+2-speed));
    FPS = Math.round(100/cSpeed);
    SECONDS_BETWEEN_FRAMES = 1 / FPS;

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);

}

function continueAnimation(){

    cXpos += cFrameWidth;
    //increase the index so we know which frame of our animation we are currently on
    cIndex += 1;

    //if our cIndex is higher than our total number of frames, we're at the end and should restart
    if (cIndex >= cTotalFrames) {
        cXpos =0;
        cIndex=0;
    }

    if(document.getElementById('loaderImage'))
        document.getElementById('loaderImage').style.backgroundPosition=(-cXpos)+'px 0';

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
}

function stopAnimation(){//stops animation
    clearTimeout(cPreloaderTimeout);
    cPreloaderTimeout=false;
}

function imageLoader(s, fun)//Pre-loads the sprites image
{
    clearTimeout(cImageTimeout);
    cImageTimeout=0;
    genImage = new Image();
    genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
    genImage.onerror=new Function('alert(\'Could not load the image\')');
    genImage.src=s;
}

//The following code starts the animation
//new imageLoader(cImageSrc, 'startAnimation()');