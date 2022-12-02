import { Component, OnInit } from '@angular/core';
import { LottiePlayer } from 'lottie-web';
import { Elastic } from 'gsap';
import {
  TweenMax,
  TimelineMax,
  Back,
  Bounce,
  Power0
} from 'gsap/all';

@Component({
  selector: 'decoration-component',
  templateUrl: './decoration.component.html',
  styleUrls: ['./decoration.component.scss'],
})
export class DecorationComponent implements OnInit {
  ngOnInit(): void {
    // Paths used to morph the side and front flaps
    const flap3 =
        'M647.874 341.275l54.357 34.965 77.45 13.492 28.702-19.864-24.894-55.19-158.516-29.814 22.901 56.411z',
      flap2 =
        'M664.101 323.951l37.022 30.208 79.968 30.509 27.292-14.8-21.814-36.603-142.232-71.27 19.764 61.956z',
      flap4 =
        'M420.196 382.821l63.685-12.709 46.568-21.001 78.141-91.307-124.027 29.725-62.382 67.632-1.985 27.66z',
      // common bounces used throughout animation
      bounce = Bounce.easeOut,
      back = Back.easeOut.config(1.4);

    // hiding several elements initially so I can animate them back in.
    TweenMax.set('#chop-sticks, .chop, #hanging-shadow, #shadow', {
      visibility: 'hidden',
    });
    TweenMax.set('#box', {
      transformOrigin: '-50% 100%',
    });

    // transforming the origin to help when I animate rotate.
    TweenMax.set('.eye', {
      transformOrigin: '50% 50%',
    });
    TweenMax.set('#flap-1', {
      transformOrigin: '-15% 50%',
    });
    TweenMax.set('#flap-2', {
      transformOrigin: '30% 0%',
    });
    TweenMax.set('.chop-1', {
      transformOrigin: '30% 0%',
    });

    // Setting up first animation morphing the flaps and the shadows on the container
    TweenMax.to('#flap-1', 0.2, {
      morphSVG: flap2,
      rotation: -30,
      y: 50,
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('#flap-1_shadow', 0.2, {
      rotation: 5,
      y: -10,
      scaleY: 0.6,
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('#flap-2', 0.2, {
      morphSVG: flap4,
      x: 10,
      rotation: 15,
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('.fill-shadow', 0.2, {
      fill: '#ffe2e4',
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('#flap-3', 0.19, {
      x: -10,
      rotation: -10,
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('#noodles', 0.401, {
      y: -10,
      rotation: -1,
      yoyo: true,
      repeat: -1,
    });
    TweenMax.to('.eye', 0.3, {
      scaleY: 0.3,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.4,
    });
    TweenMax.to('.chop-1, #chop-1', 0.2, {
      rotation: -5,
      yoyo: true,
      repeat: -1,
    });

    const shakeBox = (item) => {
      let tl = new TimelineMax({ repeat: -1, yoyo: true });
      tl.add('s');
      tl.timeScale(1);
      tl.to('#box', 0.15, {
        transformOrigin: 'center center',
        force3D: true,
        rotationZ: 5,
        rotation: -20,
        x: 20,
        y: -20,
        z: 20,
        ease: Power0.easeNone,
      }).to('#box', 0.2, {
        transformOrigin: 'center center',
        rotationZ: -20,
        rotation: 50,
        x: -20,
        y: 20,
        z: -20,
        force3D: true,
        ease: Power0.easeNone,
      });
      return tl;
    };
    const shakeShadow = (item) => {
      let tl = new TimelineMax({ repeat: -1, yoyo: true });
      tl.add('s');
      tl.timeScale(1);
      tl.to('.shadow', 0.15, {
        transformOrigin: 'center center',
        force3D: true,
        rotationZ: -5,
        rotation: 20,
        x: -20,
        y: 20,
        scaleX: 1.2,
        ease: Power0.easeNone,
      }).to('.shadow', 0.2, {
        transformOrigin: 'center center',
        rotationZ: 5,
        rotation: -20,
        x: 20,
        y: -20,
        z: 20,
        scaleX: 0.8,
        force3D: true,
        ease: Power0.easeNone,
      });
      return tl;
    };
    const chopSticks = (item) => {
      let tl = new TimelineMax({ repeat: -1 });
      tl.add('s');
      tl.timeScale(1);
      tl.to(
        '.chop',
        0.8,
        {
          autoAlpha: 1,
          x: 260,
          y: 50,
        },
        's'
      )
        .to(
          '#chop-sticks',
          0.8,
          {
            autoAlpha: 1,
            x: 200,
            y: 250,
          },
          's'
        )
        .to(
          '#hanging-shadow',
          0.3,
          {
            autoAlpha: 1,
          },
          's+=0.8'
        )
        .to(
          '#hanging-shadow, #chop-sticks, #hanging, .chop',
          0.3,
          {
            y: -500,
          },
          's+=0.8'
        );
      return tl;
    };
    const master = new TimelineMax({ delay: 0.5 });
    master.timeScale(1.5);
    master.add('s');
    master.add(shakeBox, 's').add(shakeShadow, 's').add(chopSticks);
  }
}
