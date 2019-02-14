$(function () {
    const DURATION = 400;


// OPEN
    const openBackground = new mojs.Shape({
        fill: '#FC2D79',
        scale: {0: 4.5},
        isForce3d: true,
        isTimelineLess: true,
        radius: 200,
        easing: 'cubic.out',
        backwardEasing: 'expo.in',
        duration: 2 * DURATION,
        className: 'modal-back'
    });


    const V_OPTS = {
        fill: 'none',
        stroke: 'white',
        isTimelineLess: true
    };

    const circle = new mojs.Shape({
        ...V_OPTS,
        left: '95%', top: '40px',
        radius: {0: 15},
        easing: 'cubic.out',
        strokeWidth: {10: 0},
        duration: 1.5 * DURATION,
        className: 'close-all-item'
    });


    const x = new mojs.Shape({
        ...V_OPTS,
        parent: circle.el,
        shape: 'cross',
        radius: {0: 8},
        angle: 45,
        // easing:   'cubic.out',
        duration: DURATION,
        delay: .4 * DURATION,
    });

    const burst = new mojs.Burst({
        parent: circle.el,
        radius: {0: 30},
        children: {
            ...V_OPTS,
            shape: 'line',
            scaleY: 1,
        }
    });

    const BUBBLE_OPTS = {
        ...V_OPTS,
        parent: circle.el,
        strokeWidth: {5: 0},
    };

    const bubbleTimeline = new mojs.Timeline({delay: .7 * DURATION});

    const bubble1 = new mojs.Shape({
        ...BUBBLE_OPTS,
        radius: {0: 10},
        left: 0, top: '-15%'
    });

    const bubble2 = new mojs.Shape({
        ...BUBBLE_OPTS,
        radius: {0: 6},
        delay: .4 * DURATION,
        left: '70%', top: 0
    });

    const bubble3 = new mojs.Shape({
        ...BUBBLE_OPTS,
        radius: {0: 4},
        delay: .2 * DURATION,
        left: '50%', top: '100%'
    });

    bubbleTimeline.add(bubble1, bubble2, bubble3);

    const openTimeline = new mojs.Timeline({speed: 1.25});

    const closeButtonTimeline = new mojs.Timeline({delay: DURATION / 2});

    closeButtonTimeline
        .add(
            x, circle, burst,
            bubbleTimeline
        );

    openTimeline
        .add(
            openBackground,
            closeButtonTimeline
        );

// CLOSE
    const closeCircle = new mojs.Shape({
        ...V_OPTS,
        left: '95%', top: '40px',
        radius: {0: 15},
        easing: 'cubic.out',
        strokeWidth: {5: 0},
        duration: 1.5 * DURATION,
        isShowEnd: false
    });

    const FADE_OPTS = {
        parent: closeCircle.el,
        y: {0: -100},
        fill: 'white',
        // opacity:    { 1: 0 },
        pathScale: 'rand(0.25, .75)',
        radius: 'rand(12, 15)',
        scale: {1: 0},
        delay: 'rand(0, 100)',
        isForce3d: true,
        duration: 1.5 * DURATION,
        swirlSize: 'rand(10, 15)',
        swirlFrequency: 'rand(2, 4)'
    };

    const fadeTimeline = new mojs.Timeline({delay: .15 * DURATION});
    for (let i = 0; i < 3; i++) {
        fadeTimeline.add(
            new mojs.ShapeSwirl({
                ...FADE_OPTS,
                direction: (i % 2 === 0) ? 1 : -1
            })
        );
    }

    const closeX = new mojs.Shape({
        ...V_OPTS,
        parent: closeCircle.el,
        shape: 'cross',
        radius: {8: 0},
        angle: 45,
        duration: DURATION,
        delay: .4 * DURATION,
        isShowStart: true
    });

    const closeTimeline = new mojs.Timeline();
    closeTimeline
        .add(
            closeX, closeCircle,
            fadeTimeline
        );
    const closeAllItem = $(".close-all-item"),
        viewDetailDiv = $(".view-detail-div"),
        personDetail = $("#person-detail"),
        techDetail = $("#tech-detail"),
        experienceDetail = $("#experience-detail"),
        viewDetailBtn = $(".view-detail-btn");

    closeAllItem.click(function (e) {
        circle._hide();
        openTimeline.stop();
        closeTimeline.replay();
        openBackground.replayBackward();
        viewDetailDiv.hide();
    });

    viewDetailBtn.click(function (e) {
        const item = $(this).data("item");
        switch (item) {
            case "person":
                personDetail.show();
                break;
            case "tech":
                techDetail.show();
                break;
            case "experience":
                experienceDetail.show();
                break;
            default:
                console.log("error item:", item)
        }
        openTimeline.replay();
    });

    class Star extends mojs.CustomShape {
        getShape () {
            return '<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />';
        }
    }
    mojs.addShape( 'star', Star );

    const RADIUS = 28;
    const circle2 = new mojs.Shape({
        left: 0, top: 0,
        stroke:   '#FF9C00',
        strokeWidth: { [2*RADIUS] : 0 },
        fill:     'none',
        scale:    { 0: 1, easing: 'quad.out' },
        radius:   RADIUS,
        duration:  450,
    });

    const burst2 = new mojs.Burst({
        left: 0, top: 0,
        radius:   { 6: RADIUS - 3 },
        angle:    45,
        children: {
            shape:        'star',
            radius:       RADIUS/2.2,
            fill:         '#FD7932',
            degreeShift:  'stagger(0,-5)',
            duration:     700,
            delay:        200,
            easing:       'quad.out',
            // delay:        100,
        }
    });

    const star = new mojs.Shape({
        left: 0, top: 0,
        shape:    'star',
        fill:     '#FF9C00',
        scale:    { 0 : 1 },
        easing:   'elastic.out',
        duration: 1600,
        delay:    300,
        radius:   RADIUS/2.35
    });

    const timeline = new mojs.Timeline({ speed: 1.5 });

    timeline
        .add( burst2, circle2, star );


    $(document).click(function (e) {
        const coords = { x: e.pageX, y: e.pageY };
        burst2.tune(coords);
        circle2.tune(coords);
        star.tune(coords);
        timeline.replay();
    })

});