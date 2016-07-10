/*
The MIT License (MIT)

Copyright (c) 2016 Guilherme Haschel

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
// ==UserScript==
// @name         JiraFix
// @version      0.1
// @description  Restritnge a inicialização do editor de texto ao clique do botão de editar.
// @author       Guilherme Haschel
// @icon         https://bytebucket.org/ghaschel/jirafix/raw/b92a3ffaa1b135b3fe9fdb722fb42bd10899bc34/icon48.png
// @icon64       https://bytebucket.org/ghaschel/jirafix/raw/b92a3ffaa1b135b3fe9fdb722fb42bd10899bc34/icon64.png
// @domain       sinaxkm.atlassian.net
// @include      https://sinaxkm.atlassian.net/browse/*
// @match        https://sinaxkm.atlassian.net/browse/*
// @updateURL    https://bitbucket.org/ghaschel/jirafix/raw/501c638133037800bdae8a249df4c214d651fb32/jirafix.js
// @downloadURL  https://bitbucket.org/ghaschel/jirafix/raw/501c638133037800bdae8a249df4c214d651fb32/jirafix.js
// @license      MIT
// ==/UserScript==
(function() {
    'use strict';
    $(document).ready(function($){
        window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var sheet;
        var target = document.querySelector("#description-val");
        var config = { attributes: true };

        var composeButton = function() {
            var $button = $('#description-val > .overlay-icon');
            var $sticky = $button.children('.aui-icon');
            console.log($sticky);
            $button.removeClass('aui-iconfont-edit').removeClass('aui-icon-small').removeClass('aui-icon').addClass('pointer');
            $button.append('<span class="aui-icon aui-icon-small aui-iconfont-edit fix"></span>');
        };

        var listnr = function() {
            var $editor = $('#description-val > .user-content-block');
            $editor.on('click', function(event) {
                event = event || window.event;
                event.preventDefault();
            });
        };

        var isActive = function (classes) {
            if (classes.indexOf('inactive') === -1) {
                return false;
            } else {
                return true;
            }
        };

        sheet = (function() {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style.sheet;
        })();

        var lookatmyhorse = new MutationObserver(function(mutations){
            if (typeof(mutations[2]) !== "undefined") {
                if (mutations[2].attributeName === 'class'){
                    var classes = mutations[2].target.className;
                    if (isActive(classes)) {
                        listnr();
                    }
                }
            }
        });

        lookatmyhorse.observe(target, config);
        composeButton();
        listnr();
        sheet.insertRule(".pointer { cursor: pointer; }");
        sheet.insertRule(".fix { top: 3px; left: 3px; } ");
    });
})();
