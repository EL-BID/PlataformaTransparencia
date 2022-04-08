d3.sankey = function () ***REMOVED***
    var sankey = ***REMOVED******REMOVED***,
        nodeWidth = 24,
        nodePadding = 8,
        size = [1, 1],
        nodes = [],
        links = [];

    sankey.nodeWidth = function (_) ***REMOVED***
        if (!arguments.length) return nodeWidth;
        nodeWidth = +_;
        return sankey;
***REMOVED***;

    sankey.nodePadding = function (_) ***REMOVED***
        if (!arguments.length) return nodePadding;
        nodePadding = +_;
        return sankey;
***REMOVED***;

    sankey.nodes = function (_) ***REMOVED***
        if (!arguments.length) return nodes;
        nodes = _;
        return sankey;
***REMOVED***;

    sankey.links = function (_) ***REMOVED***
        if (!arguments.length) return links;
        links = _;
        return sankey;
***REMOVED***;

    sankey.size = function (_) ***REMOVED***
        if (!arguments.length) return size;
        size = _;
        return sankey;
***REMOVED***;

    sankey.layout = function (iterations) ***REMOVED***
        computeNodeLinks();
        computeNodeValues();
        computeNodeBreadths();
        computeNodeDepths(iterations);
        computeLinkDepths();
        return sankey;
***REMOVED***;

    sankey.relayout = function () ***REMOVED***
        computeLinkDepths();
        return sankey;
***REMOVED***;

    sankey.link = function () ***REMOVED***
        var curvature = .5;

        function link(d) ***REMOVED***
            var x0 = d.source.x + d.source.dx,
                x1 = d.target.x,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = d.source.y + d.sy + d.dy / 2,
                y1 = d.target.y + d.ty + d.dy / 2;
            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1;
    ***REMOVED***

        link.curvature = function (_) ***REMOVED***
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
    ***REMOVED***;

        return link;
***REMOVED***;

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            node.sourceLinks = [];
            node.targetLinks = [];
    ***REMOVED***);
        links.forEach(function (link) ***REMOVED***
            var source = link.source,
                target = link.target;
            if (typeof source === "number") source = link.source = nodes[link.source];
            if (typeof target === "number") target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
    ***REMOVED***);
***REMOVED***

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value)
            );
    ***REMOVED***);
***REMOVED***

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() ***REMOVED***
        var remainingNodes = nodes,
            nextNodes,
            x = 0;

        while (remainingNodes.length) ***REMOVED***
            nextNodes = [];
            remainingNodes.forEach(function (node) ***REMOVED***
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function (link) ***REMOVED***
                    nextNodes.push(link.target);
            ***REMOVED***);
        ***REMOVED***);
            remainingNodes = nextNodes;
            ++x;
    ***REMOVED***

        //
        moveSinksRight(x);
        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
***REMOVED***

    function moveSourcesRight() ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            if (!node.targetLinks.length) ***REMOVED***
                node.x = d3.min(node.sourceLinks, function (d) ***REMOVED*** return d.target.x; ***REMOVED***) - 1;
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

    function moveSinksRight(x) ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            if (!node.sourceLinks.length) ***REMOVED***
                node.x = x - 1;
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

    function scaleNodeBreadths(kx) ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            node.x *= kx;
    ***REMOVED***);
***REMOVED***

    function computeNodeDepths(iterations) ***REMOVED***
        var nodesByBreadth = d3.nest()
            .key(function (d) ***REMOVED*** return d.x; ***REMOVED***)
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function (d) ***REMOVED*** return d.values; ***REMOVED***);

        //
        initializeNodeDepth();
        resolveCollisions();
        for (var alpha = 1; iterations > 0; --iterations) ***REMOVED***
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            relaxLeftToRight(alpha);
            resolveCollisions();
    ***REMOVED***

        function initializeNodeDepth() ***REMOVED***
            var ky = d3.min(nodesByBreadth, function (nodes) ***REMOVED***
                return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
        ***REMOVED***);

            nodesByBreadth.forEach(function (nodes) ***REMOVED***
                nodes.forEach(function (node, i) ***REMOVED***
                    node.y = i;
                    node.dy = node.value * ky;
            ***REMOVED***);
        ***REMOVED***);

            links.forEach(function (link) ***REMOVED***
                link.dy = link.value * ky;
        ***REMOVED***);
    ***REMOVED***

        function relaxLeftToRight(alpha) ***REMOVED***
            nodesByBreadth.forEach(function (nodes, breadth) ***REMOVED***
                nodes.forEach(function (node) ***REMOVED***
                    if (node.targetLinks.length) ***REMOVED***
                        var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***);

            function weightedSource(link) ***REMOVED***
                return center(link.source) * link.value;
        ***REMOVED***
    ***REMOVED***

        function relaxRightToLeft(alpha) ***REMOVED***
            nodesByBreadth.slice().reverse().forEach(function (nodes) ***REMOVED***
                nodes.forEach(function (node) ***REMOVED***
                    if (node.sourceLinks.length) ***REMOVED***
                        var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***);

            function weightedTarget(link) ***REMOVED***
                return center(link.target) * link.value;
        ***REMOVED***
    ***REMOVED***

        function resolveCollisions() ***REMOVED***
            nodesByBreadth.forEach(function (nodes) ***REMOVED***
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i;

                // Push any overlapping nodes down.
                nodes.sort(ascendingDepth);
                for (i = 0; i < n; ++i) ***REMOVED***
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) node.y += dy;
                    y0 = node.y + node.dy + nodePadding;
            ***REMOVED***

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - nodePadding - size[1];
                if (dy > 0) ***REMOVED***
                    y0 = node.y -= dy;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) ***REMOVED***
                        node = nodes[i];
                        dy = node.y + node.dy + nodePadding - y0;
                        if (dy > 0) node.y -= dy;
                        y0 = node.y;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***

        function ascendingDepth(a, b) ***REMOVED***
            return a.y - b.y;
    ***REMOVED***
***REMOVED***

    function computeLinkDepths() ***REMOVED***
        nodes.forEach(function (node) ***REMOVED***
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
    ***REMOVED***);
        nodes.forEach(function (node) ***REMOVED***
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function (link) ***REMOVED***
                link.sy = sy;
                sy += link.dy;
        ***REMOVED***);
            node.targetLinks.forEach(function (link) ***REMOVED***
                link.ty = ty;
                ty += link.dy;
        ***REMOVED***);
    ***REMOVED***);

        function ascendingSourceDepth(a, b) ***REMOVED***
            return a.source.y - b.source.y;
    ***REMOVED***

        function ascendingTargetDepth(a, b) ***REMOVED***
            return a.target.y - b.target.y;
    ***REMOVED***
***REMOVED***

    function center(node) ***REMOVED***
        return node.y + node.dy / 2;
***REMOVED***

    function value(link) ***REMOVED***
        return link.value;
***REMOVED***

    return sankey;
***REMOVED***;