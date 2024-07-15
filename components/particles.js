import React, { useRef, useEffect, useCallback } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const createParticle = (width, height) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1 + 1,
    speedY: (Math.random() * 0.05 - 0.025) * 0.5,
    wobble: Math.random() * 0.3 + 0.1,
    wobbleSpeed: (Math.random() * 0.02 - 0.01) * 0.5,
    angle: Math.random() * Math.PI * 2,
    color: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
  });

  const createParticles = (width, height) => {
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(width, height));
    }
    return particles;
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    particlesRef.current = createParticles(canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.y += particle.speedY;
        particle.x += Math.sin(particle.angle) * particle.wobble;
        particle.angle += particle.wobbleSpeed;

        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: '48%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default Particles;