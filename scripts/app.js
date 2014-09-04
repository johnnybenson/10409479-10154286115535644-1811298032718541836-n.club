var __DEV__ = false;

(function($, exports){

    //
    // Utilities
    //
    var utils = {};
    utils.log = function() {
        if (__DEV__) {
            console.log.apply(console, arguments);
        }
    };
    utils.pad = function(num, size){
        size = size || 3;
        return ('00' + num).substr(-size);
    };
    utils.increment = function(str_num, amount) {
        return ((1 * str_num) + amount).toString();
    };
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    utils.shuffleArray = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    utils.doSometimes = function(fn, percentage){
        if ((Math.random() <= percentage) && (typeof fn === 'function')) {
            return fn();
        }
        return false;
    };
    utils.getRandomColor = function(options){
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    };
    utils.Cookie = {

        unset: function(name) {
            Cookie.set(name, '', -1);
        },

        get: function (name){
            return new RegExp(name+"=([^;]+)").test(unescape(document.cookie)) ? RegExp.$1 : null;
        },

        set: function(name, value, expire_seconds, opts) {
            opts = opts || {};
            var ex_date = new Date();
            var path = opts.path ? opts.path : '/';
            var is_secure = opts.is_secure ? true : false;
            var domain = opts.domain ? opts.domain : '';
            ex_date.setTime(ex_date.getTime() + (expire_seconds * 1000));

            document.cookie = name + "=" + escape(value) + ((expire_seconds === null) ? '' : ';expires=' + ex_date.toGMTString()) + ';path=' + path + ((is_secure === false) ? '' : ';secure') + ((domain === '') ? '' : ';domain=' + domain);
        }
    };
    utils.getIPInfo = function(){
        $.get("http://ipinfo.io", function(response) {
            utils.Cookie.set('you', JSON.stringify({ 
                'city' : response.city, 
                'country' : response.country
            }));
        }, "jsonp");
    };
    utils.slugify = function(text, separator)
    {
      separator = (separator !== null) ? separator : '-'; // default to hyphen
      return text.toString().toLowerCase()
        .replace(/\s+/g, separator)             // Replace spaces with -
        .replace(/[^\w\-]+/g, '')               // Remove all non-word chars
        .replace(/\-\-+/g, separator)           // Replace multiple - with single -
        .replace(/^-+/, '')                     // Trim - from start of text
        .replace(/-+$/, '');                    // Trim - from end of text
    };

    exports.utils = utils;

    //
    // Config
    //
    var config = {
        CLIP_PATH   : '/videos/whatever-',
        CLIPS       : 666,
        LINES       : 1995
    };

    var heads = [
        '(╯°□°）╯︵ ┻━┻',
        'ლ(ಠ益ಠლ)',
        '(ಠ_ಠ)',
        '༼ つ ◕_◕ ༽つ  ',
        'ヽ༼ຈل͜ຈ༽ﾉ',
        '(◔ ‿ ◔)',
        'ˁ(⦿ᴥ⦿)ˀ',
        '-(• _ •)-',
        '⊂(◉‿◉)つ',
        '(`･ω･´)',
        // thanks dude!
        // https://github.com/maxogden/cool-ascii-faces
        "( .-. )",
        "( .o.)",
        "( `·´ )",
        "( ° ͜ ʖ °)",
        "( ͡° ͜ʖ ͡°)",
        "( ⚆ _ ⚆ )",
        "( ︶︿︶)",
        "( ﾟヮﾟ)",
        "(\\/)(°,,,°)(\\/)",
        "(¬_¬)",
        "(¬º-°)¬",
        "(¬‿¬)",
        "(°ロ°)☝",
        "(´・ω・)っ",
        "(ó ì_í)",
        "(ʘᗩʘ')",
        "(ʘ‿ʘ)",
        "(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄",
        "(͡° ͜ʖ ͡°)",
        "(ಠ_ಠ)",
        "(ಠ‿ಠ)",
        "(ಠ⌣ಠ)",
        "(ಥ_ಥ)",
        "(ಥ﹏ಥ)",
        "(ง ͠° ͟ل͜ ͡°)ง",
        "(ง ͡ʘ ͜ʖ ͡ʘ)ง",
        "(ง •̀_•́)ง",
        "(ง'̀-'́)ง",
        "(ง°ل͜°)ง",
        "(ง⌐□ل͜□)ง",
        "(ღ˘⌣˘ღ)",
        "(ᵔᴥᵔ)",
        "(•ω•)",
        "(•◡•)/",
        "(⊙ω⊙)",
        "(⌐■_■)",
        "(─‿‿─)",
        "(╯°□°）╯",
        "(◕‿◕)",
        "(☞ﾟ∀ﾟ)☞",
        "(❍ᴥ❍ʋ)",
        "(っ◕‿◕)っ",
        "(づ｡◕‿‿◕｡)づ",
        "(ノಠ益ಠ)ノ",
        "(ノ・∀・)ノ",
        "(；一_一)",
        "(｀◔ ω ◔´)",
        "(｡◕‿‿◕｡)",
        "(ﾉ◕ヮ◕)ﾉ",
        "*<{:¬{D}}}",
        "=^.^=",
        "t(-.-t)",
        "| (• ◡•)|",
        "~(˘▾˘~)",
        "¬_¬",
        "¯(°_o)/¯",
        "¯_(ツ)_/¯",
        "°Д°",
        "ɳ༼ຈل͜ຈ༽ɲ",
        "ʅʕ•ᴥ•ʔʃ",
        "ʕ´•ᴥ•`ʔ",
        "ʕ•ᴥ•ʔ",
        "ʕ◉.◉ʔ",
        "ʕㅇ호ㅇʔ",
        "ʕ；•`ᴥ•´ʔ",
        "ʘ‿ʘ",
        "͡° ͜ʖ ͡°",
        "ζ༼Ɵ͆ل͜Ɵ͆༽ᶘ",
        "Ѱζ༼ᴼل͜ᴼ༽ᶘѰ",
        "ب_ب",
        "٩◔̯◔۶",
        "ಠ_ಠ",
        "ಠoಠ",
        "ಠ~ಠ",
        "ಠ‿ಠ",
        "ಠ⌣ಠ",
        "ಠ╭╮ಠ",
        "ರ_ರ",
        "ง ͠° ل͜ °)ง",
        "๏̯͡๏﴿",
        "༼ ºººººل͟ººººº ༽",
        "༼ ºل͟º ༽",
        "༼ ºل͟º༼",
        "༼ ºل͟º༽",
        "༼ ͡■ل͜ ͡■༽",
        "༼ つ ◕_◕ ༽つ",
        "༼ʘ̚ل͜ʘ̚༽",
        "ლ(´ڡ`ლ)",
        "ლ(́◉◞౪◟◉‵ლ)",
        "ლ(ಠ益ಠლ)",
        "ᄽὁȍ ̪őὀᄿ",
        "ᔑ•ﺪ͟͠•ᔐ",
        "ᕕ( ᐛ )ᕗ",
        "ᕙ(⇀‸↼‶)ᕗ",
        "ᕙ༼ຈل͜ຈ༽ᕗ",
        "ᶘ ᵒᴥᵒᶅ",
        "≧☉_☉≦",
        "⊙▃⊙",
        "⊙﹏⊙",
        "┌( ಠ_ಠ)┘",
        "╚(ಠ_ಠ)=┐",
        "◉_◉",
        "◔ ⌣ ◔",
        "◔̯◔",
        "◕‿↼",
        "◕‿◕",
        "☉_☉",
        "☜(⌒▽⌒)☞",
        "☼.☼",
        "♥‿♥",
        "⚆ _ ⚆",
        "✌(-‿-)✌",
        "〆(・∀・＠)",
        "ノ( º _ ºノ)",
        "ノ( ゜-゜ノ)",
        "ヽ( ͝° ͜ʖ͡°)ﾉ",
        "ヽ(`Д´)ﾉ",
        "ヽ༼° ͟ل͜ ͡°༽ﾉ",
        "ヽ༼ʘ̚ل͜ʘ̚༽ﾉ",
        "ヽ༼ຈل͜ຈ༽ง",
        "ヽ༼ຈل͜ຈ༽ﾉ",
        "ヽ༼Ὸل͜ຈ༽ﾉ",
        "ヾ(⌐■_■)ノ",
        "꒰･◡･๑꒱",
        "﴾͡๏̯͡๏﴿",
        "｡◕‿◕｡",
        "ʕノ◔ϖ◔ʔノ",
        "꒰•̥̥̥̥̥̥̥ ﹏ •̥̥̥̥̥̥̥̥๑꒱",
        "ಠ_ರೃ",
        "(ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू)",
        "(ꈨຶꎁꈨຶ)۶”",
        "(ꐦ°᷄д°᷅)",
        "(۶ૈ ۜ ᵒ̌▱๋ᵒ̌ )۶ૈ=͟͟͞͞ ⌨",
        "₍˄·͈༝·͈˄₎◞ ̑̑ෆ⃛",
        "(*ﾟ⚙͠ ∀ ⚙͠)ﾉ❣",
        "٩꒰･ัε･ั ꒱۶",
        "ヘ（。□°）ヘ",
        "˓˓(ृ　 ु ॑꒳’)ु(ृ’꒳ ॑ ृ　)ु˒˒˒",
        "꒰✘Д✘◍꒱",
        "૮( ᵒ̌ૢཪᵒ̌ૢ )ა",
        "“ψ(｀∇´)ψ",
        "ಠﭛಠ",
        "(๑>ᴗ<๑)",
        "(۶ꈨຶꎁꈨຶ )۶ʸᵉᵃʰᵎ",
        "٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ",
        "(oT-T)尸",
        "(✌ﾟ∀ﾟ)☞",
        "ಥ‿ಥ",
        "ॱ॰⋆(˶ॢ‾᷄﹃‾᷅˵ॢ)",
        "┬┴┬┴┤  (ಠ├┬┴┬┴",
        "( ˘ ³˘)♥",
        "Σ (੭ु ຶਊ ຶ)੭ु⁾⁾",
        "(⑅ ॣ•͈ᴗ•͈ ॣ)",
        "ヾ(´￢｀)ﾉ",
        "(•̀o•́)ง",
        "(๑•॒̀ ູ॒•́๑)",
        "⚈้̤͡ ˌ̫̮ ⚈้̤͡",
        "=͟͟͞͞ =͟͟͞͞ ﾍ( ´Д`)ﾉ",
        "(((╹д╹;)))",
        "•̀.̫•́✧",
        "(ᵒ̤̑ ₀̑ ᵒ̤̑)"
    ];

    //
    // Router
    //
    exports.Bae = Backbone.Router.extend({

        routes: {
            ':scene' : 'setup_scene',
            '666'    : 'you_have_no_power_over_me',
            '666/you-have-no-power-over-me' : 'order_a_pizza'
        },

        current_index: 0,
        current_line: 0,

        can_play: false,

        initialize: function(options) {

            this.$$.win.on('load', _.bind(function(){
                this.$$.html.removeClass('special-thanks-to-my-guy-shaun-kardinal');
            }, this));

            this.player = new GoblinKing({
                'router': this
            });

            this.lines = options.everything || [];
            
            if (!utils.Cookie.get('you')) {
                utils.getIPInfo();    
            }

            this.search_string = document.location.search;

            if (this.search_string.length) {
                history.replaceState(null, null, '/');
                this.start_the_movie(this.search_string.substr(1));
            } else {
                this.start_the_movie();
            }
        },

        $$: (function() {
            return {
                win    : $(window),
                doc    : $(document),
                html   : $('html'),
                body   : $('body'),
                o      : $('#oubliette'),
                video_template : _.template('<video width="640" height="640" class="v" id="ugh-<%- id %>"><source src="<%- video %>" type="video/mp4"></video>'),
            };
        }()),

        _scenes: {},

        get_hash: function() {
            return document.location.hash;
        },

        start_the_movie: function(offset) {
            offset = offset || '1';
            setTimeout(_.bind(function(){
                if (!Backbone.history.fragment) {
                    this.navigate(offset.toString(), { trigger: true });
                }
            }, this), 1000);
        },

        setup_scene: function(num) {

            this.prev_index     = utils.increment(num, -1);
            this.current_index  = num;
            this.next_index     = utils.increment(num, +1);

            this.current_line = Math.floor(this.current_index * (config.LINES / config.CLIPS));

            this.current_scene = this._scenes[num] || (this._scenes[num] = new Scene({
                'router': this,
                'prev_index': this.prev_index,
                'current_index': this.current_index,
                'next_index': this.next_index
            }));

            this.play_lines();
        },

        play_prev_scene: function() {
            this.pause_scene();
            this.navigate(this.prev_index, { trigger: true });
        },

        play_next_scene: function() {
            this.pause_scene();
            this.navigate(this.next_index, { trigger: true });
        },

        pause_scene: function(num) {
            var scene = (num) ? this._scenes[num] : this.current_scene;
            utils.log('pause_scene', scene);
            if (scene) {
                scene.pause_video(scene.$current_video);
                scene.end_scene(scene.$current_video);
            }
            this.pause_lines();
        },

        play_scene: function(num) {
            var scene = (num) ? this._scenes[num] : this.current_scene;
            utils.log('play_scene', scene);
            if (scene) {
                scene.play_video(scene.$current_video);
            }
            this.play_lines();
        },

        pause_lines: function() {
            clearInterval(this.linesInterval);
            this.linesInterval = null;
        },

        play_lines: function() {
            if (!this.linesInterval) {
                this.linesInterval = setInterval(_.bind(this.say_next_line, this), 2600);
            }
        },

        say_next_line: function() {
            var num = this.current_line++;
            if (this.lines[num]) {
                history.replaceState(null, null, '/' + this.lines[num] + this.get_hash());
            }
        },
 
        you_have_no_power_over_me: function() {
            this.navigate('666/you-have-no-power-over-me', { trigger: true });
        },

        order_a_pizza: function() {
            document.location.replace('https://www.facebook.com/events/305616646281182');
        }

    });


    //
    //  Goblin King Goblin King
    //
    var GoblinKing = Backbone.View.extend({

        el: 'body',

        events: {
            'keyup'                 : 'keycommands',
            'mousedown #oubliette'  : 'play_scene',
            'mouseup'               : 'pause_scene'
        },

        initialize: function(options){

            utils.log('GoblinKing:initialize', options);

            if (options) {
                this.router         = options.router || {};
                this.$$             = this.router.$$ || {};
            }

            this.$o = this.$('#oubliette');

            this.setup();
        },

        setup: function() {
            this.$o.addClass('sleep');
            this.can_play_duration = 3000;
            this.can_play_timeout = null;

            this.router.can_play = false;
            this.router.pause_scene();
        },

        keycommands: function(e) {
            
            utils.log(e.keyCode);
            
            // ESC
            if (e.keyCode === 27) {
                // this.router.order_a_pizza();
            
            // Any Key
            } else if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                this.router.play_next_scene();
            }
        },

        play_scene: function() {
            this.$o.removeClass('sleep');
            this.router.can_play = true;
            this.router.play_scene();
        },

        pause_scene: function() {
            this.set_href();
            this.setup();
        },

        set_href: function() {
            utils.log(this.generate_mailto());
            this.$o.attr('href', this.generate_mailto());
        },

        nl: function() {
            return escape('\n\n');
        },

        random_head: function() {
            var your_head = utils.shuffleArray(heads);
            return your_head[0];
        },

        generate_mailto: function() {
            
            var protocol = 'mailto:';
            var gspot = 'tumblr.com';
            var stalking_you = '';
            
            try {
                stalking_you = JSON.parse(wnwns.utils.Cookie.get('you'));
            } catch(err) {}
            if (stalking_you !== '') {
                stalking_you = '#' + utils.slugify(stalking_you.city, '');
            }

            return protocol + 'kjifwfegmkuxx@' + gspot + '?subject=' + document.location.pathname.split('/~')[1] + '&body=' + document.location.origin + '/?' + document.location.hash.substr(1) + this.nl() + '#' + utils.slugify('you have no power over me', '') + this.nl() + '#10409479101542861155356441811298' + this.nl() + stalking_you + this.nl() + this.random_head();
        }

    });

    //
    // View
    //
    var Scene = Backbone.View.extend({

        _videos: {},

        is_playing: false,

        initialize: function(options) {

            this.router         = options.router;
            this.$$             = this.router.$$ || {};
            this.$o             = this.router.$$.o;
            this.prev_index     = options.prev_index;
            this.current_index  = options.current_index;
            this.next_index     = options.next_index;

            this.prev_video    = this._get_video(this.prev_index);
            this.current_video = this._get_video(this.current_index);
            this.next_video    = this._get_video(this.next_index);

            this.$prev_video    = this.prev_video.markup;
            this.$current_video = this.current_video.markup;
            this.$next_video    = this.next_video.markup;

            this.$current_video.on('loadeddata', _.bind(this.play_scene, this, this.$current_video));
            this.$current_video.on('play',       _.bind(this.end_scene, this,  this.$prev_video));
            this.$current_video.on('ended',      _.bind(this.router.play_next_scene, this.router));

            if (!this.current_video.rendered) {
                this.$current_video.appendTo(this.$o);
                this.current_video.rendered = true;
            }

            if (!this.next_video.rendered) {
                this.$next_video.appendTo(this.$o);
                this.next_video.rendered = true;
            }

            if (this.$current_video[0].readyState === 4) {
                this.play_scene(this.$current_video);
            }
        },

        _get_video_path: function(num) {
            utils.log('get_video_path', num);
            return config.CLIP_PATH + utils.pad(num) + '.mov';
        },

        _get_video: function(num) {
            return this._videos[num] || (this._videos[num] = {
                'markup'   : $(this.render_video(num)),
                'rendered' : false
            });
        },

        play_scene: function($video) {
            $video.off('loadeddata');
            this.play_video($video);
        },

        play_video: function($video) {
            utils.log('scene:play_video', $video);
            if (this.router.can_play) {
                this.is_playing = true;
                $video.addClass('is_playing');
                $video[0].play();
            }
        },

        pause_video: function($video) {
            utils.log('scene:pause_video', $video);
            this.is_playing = false;
            $video.removeClass('is_playing');
            $video[0].pause();
        },

        end_scene: function($video) {
            this.pause_video($video);    
        },

        render_video: function(num) {
            return this.$$.video_template({ 'id' : num, 'video' : this._get_video_path(num) });
        }

    });

}(jQuery, wnwns));
