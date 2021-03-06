$(document).ready(function() {
    $('.header_burger').click(function() {
        $('.header_burger, .header_menu,.btn_top').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.header_menu').click(function() {
        $('.header_burger, .header_menu. btn_top').removeClass('active');
        $('body').removeClass('lock');
    });
    $('.btn_tex_header').click(function() {
        $('.header_section_after').toggleClass('color');

    });
});
//---Paralax
bdy.onscroll = function() {
        let a = screen.height / 6
        let b = screen.availHeight / 3
        a = 180

        let opacityH2 = document.querySelector('.content_first_h2');
        let allUp = document.querySelector('.content_portfolio_h2');
        let contentThirdHUp = document.querySelector('.content_about_h2');
        console.log(allUp.getBoundingClientRect().top)

        if (opacityH2.getBoundingClientRect().top <= a) {
            opacityH2.style.opacity = '1'
            opacityH2.style.marginBottom = '8vh'

        }
        if (allUp.getBoundingClientRect().top <= a) {
            allUp.style.opacity = '1'
            allUp.style.marginBottom = '8vh'

        }
        if (contentThirdHUp.getBoundingClientRect().top <= a) {
            contentThirdHUp.style.opacity = '1'
            contentThirdHUp.style.marginBottom = '3vh'

        }

    }
    //----Portfolio
$(function() {
    $(".btn_tex_header ").mouseover(function(e) {

        var pos = $(this).offset();
        var elem_left = pos.left;
        var elem_top = pos.top;

        var Xinner = e.pageX - elem_left;
        var Yinner = e.pageY - elem_top;
        $(this).find(".btn_hover").css({
            "left": Xinner,
            "top": Yinner
        })
    });
}); {
    // particles class
    class Particle {
        constructor(k, i, j) {
            this.i = i;
            this.j = j;
            this.init();
            this.x = this.x0;
            this.y = this.y0;
            this.pos = posArray.subarray(k * 3, k * 3 + 3);
            this.pointer = pointer;
        }
        init() {
            this.x0 = canvas.width * 0.5 + this.i * canvas.width / 240;
            this.y0 = canvas.height * 0.5 + this.j * canvas.height / 160;
        }
        move() {
            const dx = this.pointer.x - this.x;
            const dy = this.pointer.y - this.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const s = 1000 / d;
            this.x += -s * (dx / d) + (this.x0 - this.x) * 0.02;
            this.y += -s * (dy / d) + (this.y0 - this.y) * 0.02;
            // update buffer position
            this.pos[0] = this.x;
            this.pos[1] = this.y;
            this.pos[2] = 0.15 * s * s;
        }
    }
    // webGL canvas
    const canvas = {
        init(options) {
            // set webGL context
            this.elem = document.querySelector("canvas");
            const gl = (this.gl =
                this.elem.getContext("webgl", options) ||
                this.elem.getContext("experimental-webgl", options));
            if (!gl) return false;
            // compile shaders
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(
                vertexShader,
                `
					precision highp float;
					attribute vec3 aPosition;
					uniform vec2 uResolution;
					void main() {
						gl_PointSize = max(2.0, min(30.0, aPosition.z));
						gl_Position = vec4(
							( aPosition.x / uResolution.x * 2.0) - 1.0, 
							(-aPosition.y / uResolution.y * 2.0) + 1.0, 
							0.0,
							1.0
						);
					}
      	`
            );
            gl.compileShader(vertexShader);
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(
                fragmentShader,
                `
					precision highp float;
					void main() {
						vec2 pc = 2.0 * gl_PointCoord - 1.0;
						gl_FragColor = vec4(1.0, 0.85, 0.25, 1.0 - dot(pc, pc));
					}
				`
            );
            gl.compileShader(fragmentShader);
            const program = (this.program = gl.createProgram());
            gl.attachShader(this.program, vertexShader);
            gl.attachShader(this.program, fragmentShader);
            gl.linkProgram(this.program);
            gl.useProgram(this.program);
            // resolution
            this.uResolution = gl.getUniformLocation(this.program, "uResolution");
            gl.enableVertexAttribArray(this.uResolution);
            // canvas resize
            this.resize();
            window.addEventListener("resize", () => this.resize(), false);
            return gl;
        },
        resize() {
            this.width = this.elem.width = this.elem.offsetWidth;
            this.height = this.elem.height = this.elem.offsetHeight;
            for (const p of particles) p.init();
            this.gl.uniform2f(this.uResolution, this.width, this.height);
            this.gl.viewport(
                0,
                0,
                this.gl.drawingBufferWidth,
                this.gl.drawingBufferHeight
            );
        }
    };
    const pointer = {
        init(canvas) {
            this.x = 0.1 + canvas.width * 0.5;
            this.y = canvas.height * 0.5;
            this.s = 0;
            ["mousemove", "touchstart", "touchmove"].forEach((event, touch) => {
                document.addEventListener(
                    event,
                    e => {
                        if (touch) {
                            e.preventDefault();
                            this.x = e.targetTouches[0].clientX;
                            this.y = e.targetTouches[0].clientY;
                        } else {
                            this.x = e.clientX;
                            this.y = e.clientY;
                        }
                    },
                    false
                );
            });
        }
    };
    // init webGL canvas
    const particles = [];
    const gl = canvas.init({
        alpha: false,
        stencil: true,
        antialias: true,
        depth: false
    });
    // additive blending "lighter"
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    // init pointer
    pointer.init(canvas);
    // init particles
    const nParticles = 240 * 80;
    const posArray = new Float32Array(nParticles * 3);
    let k = 0;
    for (let i = -120; i < 120; i++) {
        for (let j = -40; j < 40; j++) {
            particles.push(new Particle(k++, i, j));
        }
    }
    // create position buffer
    const aPosition = gl.getAttribLocation(canvas.program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    const positionBuffer = gl.createBuffer();
    // draw all particles
    const draw = () => {
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                posArray,
                gl.DYNAMIC_DRAW
            );
            gl.drawArrays(gl.GL_POINTS, 0, nParticles);
        }
        // main animation loop
    const run = () => {
        requestAnimationFrame(run);
        for (const p of particles) p.move();
        draw();
    };
    requestAnimationFrame(run);
}