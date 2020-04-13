tinymce.PluginManager.add('smileys', function (editor, url) {
    var defaultSmileys = [
                        [
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f604.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f602.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f601.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f603.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f605.png' }
                        ],
                        [
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f606.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f609.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f60a.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f60b.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f60c.png' }
                        ],
                        [
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f60d.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f60f.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f612.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f613.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f614.png' }
                        ],
						[
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f616.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f618.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f61c.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f61d.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f61e.png' }
                        ],
						[
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f620.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f621.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f622.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f623.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f624.png' }
                        ],
						[
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f625.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f628.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f629.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f62a.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f62b.png' }
                        ],
						[
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f62d.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f630.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f631.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f632.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f633.png' }
                        ],
						[
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f635.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f637.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f647.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f64c.png' },
							{ url: 'https://de9xxjhuq2c2j.cloudfront.net/apps/live-20180516-1/images/emoji/emoji-apple/1f64f.png' }
                        ]
    ];

    var smileys = editor.settings.smileys || defaultSmileys, fullSmileysList = editor.settings.extended_smileys ? smileys.concat(editor.settings.extended_smileys) : smileys;

    function getHtml() {
        var smileysHtml;

        smileysHtml = '<table role="presentation" class="mce-grid">';

        tinymce.each(fullSmileysList, function (row) {
            smileysHtml += '<tr>';

            tinymce.each(row, function (icon) {
                smileysHtml += '<td><a href="#" data-mce-url="' + icon.url + '" tabindex="-1"><img src="' +
                    icon.url + '" style="width: 16px; height: 16px"></a></td>';
            });

            smileysHtml += '</tr>';
        });

        smileysHtml += '</table>';

        return smileysHtml;
    }

    function concatArray(array) {
        var each = tinymce.each, result = [];
        each(array, function (item) {
            result = result.concat(item);
        });
        return result.length > 0 ? result : array;
    }

    function findAndReplaceDOMText(regex, node, replacementNode, captureGroup, schema) {
        var m, matches = [], text, count = 0, doc;
        var blockElementsMap, hiddenTextElementsMap, shortEndedElementsMap;

        doc = node.ownerDocument;
        blockElementsMap = schema.getBlockElements(); // H1-H6, P, TD etc
        hiddenTextElementsMap = schema.getWhiteSpaceElements(); // TEXTAREA, PRE, STYLE, SCRIPT
        shortEndedElementsMap = schema.getShortEndedElements(); // BR, IMG, INPUT

        function getMatchIndexes(m, captureGroup) {
            captureGroup = captureGroup || 0;

            var index = m.index;

            if (captureGroup > 0) {
                var cg = m[captureGroup];
                index += m[0].indexOf(cg);
                m[0] = cg;
            }

            return [index, index + m[0].length, [m[0]]];
        }

        function getText(node) {
            var txt;

            if (node.nodeType === 3) {
                return node.data;
            }

            if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
                return '';
            }

            txt = '';

            if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
                txt += '\n';
            }

            if ((node = node.firstChild)) {
                do {
                    txt += getText(node);
                } while ((node = node.nextSibling));
            }

            return txt;
        }

        function stepThroughMatches(node, matches, replaceFn) {
            var startNode, endNode, startNodeIndex,
                endNodeIndex, innerNodes = [], atIndex = 0, curNode = node,
                matchLocation = matches.shift(), matchIndex = 0;

            out: while (true) {
                if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName]) {
                    atIndex++;
                }

                if (curNode.nodeType === 3) {
                    if (!endNode && curNode.length + atIndex >= matchLocation[1]) {
                        // We've found the ending
                        endNode = curNode;
                        endNodeIndex = matchLocation[1] - atIndex;
                    } else if (startNode) {
                        // Intersecting node
                        innerNodes.push(curNode);
                    }

                    if (!startNode && curNode.length + atIndex > matchLocation[0]) {
                        // We've found the match start
                        startNode = curNode;
                        startNodeIndex = matchLocation[0] - atIndex;
                    }

                    atIndex += curNode.length;
                }

                if (startNode && endNode) {
                    curNode = replaceFn({
                        startNode: startNode,
                        startNodeIndex: startNodeIndex,
                        endNode: endNode,
                        endNodeIndex: endNodeIndex,
                        innerNodes: innerNodes,
                        match: matchLocation[2],
                        matchIndex: matchIndex
                    });

                    // replaceFn has to return the node that replaced the endNode
                    // and then we step back so we can continue from the end of the
                    // match:
                    atIndex -= (endNode.length - endNodeIndex);
                    startNode = null;
                    endNode = null;
                    innerNodes = [];
                    matchLocation = matches.shift();
                    matchIndex++;

                    if (!matchLocation) {
                        break; // no more matches
                    }
                } else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
                    // Move down
                    curNode = curNode.firstChild;
                    continue;
                } else if (curNode.nextSibling) {
                    // Move forward:
                    curNode = curNode.nextSibling;
                    continue;
                }

                // Move forward or up:
                while (true) {
                    if (curNode.nextSibling) {
                        curNode = curNode.nextSibling;
                        break;
                    } else if (curNode.parentNode !== node) {
                        curNode = curNode.parentNode;
                    } else {
                        break out;
                    }
                }
            }
        }

        /**
        * Generates the actual replaceFn which splits up text nodes
        * and inserts the replacement element.
        */
        function genReplacer(nodeName) {
            var makeReplacementNode;

            if (typeof nodeName != 'function') {
                var stencilNode = nodeName.nodeType ? nodeName : doc.createElement(nodeName);

                makeReplacementNode = function () {
                    var clone = stencilNode.cloneNode(false);
                    return clone;
                };
            } else {
                makeReplacementNode = nodeName;
            }

            return function replace(range) {
                var before, after, parentNode, startNode = range.startNode,
                    endNode = range.endNode;

                if (startNode === endNode) {
                    var node = startNode;

                    parentNode = node.parentNode;
                    if (range.startNodeIndex > 0) {
                        // Add `before` text node (before the match)
                        before = doc.createTextNode(node.data.substring(0, range.startNodeIndex));
                        parentNode.insertBefore(before, node);
                    }

                    // Create the replacement node:
                    var el = makeReplacementNode();
                    parentNode.insertBefore(el, node);
                    if (range.endNodeIndex < node.length) {
                        // Add `after` text node (after the match)
                        after = doc.createTextNode(node.data.substring(range.endNodeIndex));
                        parentNode.insertBefore(after, node);
                    }

                    node.parentNode.removeChild(node);

                    return el;
                }
            };
        }

        text = getText(node);
        if (!text) {
            return;
        }
        while ((m = regex.exec(text))) {
            matches.push(getMatchIndexes(m, captureGroup));
        }

        if (matches.length) {
            count = matches.length;
            stepThroughMatches(node, matches, genReplacer(replacementNode));
        }

        return count;
    }

    editor.addButton('smileys', {
        type: 'panelbutton',
        icon: 'emoticons',
        panel: {
            autohide: true,
            html: getHtml,
            onclick: function (e) {
                var linkElm = editor.dom.getParent(e.target, 'a');

                if (linkElm) {
                    editor.insertContent('<img style="width:18px; height:18px;" src="' + linkElm.getAttribute('data-mce-url') + '" />');
                    this.hide();
                }
            }
        },
        tooltip: 'Smileys'
    });
});
