// DOM要素の取得
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const navLinks = document.querySelectorAll('.nav-link');

// ハンバーガーメニューの切り替え
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// ナビゲーションリンククリック時の処理
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }

    // モバイルメニューを閉じる
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// スクロール時の処理
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // ヘッダーの背景色変更
  const header = document.querySelector('.header');
  if (scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  }

  // スクロールトップボタンの表示/非表示
  if (scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// スクロールトップボタンのクリック処理
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// フェードインアニメーションの実装
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// フェードイン対象要素の設定
const fadeElements = document.querySelectorAll('.organizer-card, .artist-card, .news-item, .qa-item, .contact-form');
fadeElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// プロフィールカードのホバーエフェクト
const profileCards = document.querySelectorAll('.organizer-card, .artist-card');
profileCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// フォーム送信処理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // フォームデータの取得
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // バリデーション
    if (!name || !email || !subject || !message) {
      alert('すべての項目を入力してください。');
      return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('正しいメールアドレスを入力してください。');
      return;
    }

    // 送信処理（実際の実装ではサーバーに送信）
    alert('お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。');
    contactForm.reset();
  });
}

// 入力フィールドのフォーカスエフェクト
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.style.borderColor = '#d14e38';
    input.style.boxShadow = '0 0 0 3px rgba(209, 78, 56, 0.1)';
  });

  input.addEventListener('blur', () => {
    input.style.borderColor = '#e0e0e0';
    input.style.boxShadow = 'none';
  });
});

// スムーズスクロールの実装
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
  // ヒーローセクションのアニメーション
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDate = document.querySelector('.hero-date');

  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }

  if (heroSubtitle) {
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 500);
  }

  if (heroDate) {
    setTimeout(() => {
      heroDate.style.opacity = '1';
      heroDate.style.transform = 'translateY(0)';
    }, 700);
  }
});

// リサイズ時の処理
window.addEventListener('resize', () => {
  // モバイルメニューが開いている場合は閉じる
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// キーボードナビゲーション
document.addEventListener('keydown', (e) => {
  // ESCキーでモバイルメニューを閉じる
  if (e.key === 'Escape') {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// パフォーマンス最適化：スクロールイベントのthrottle
let ticking = false;

function updateScrollEffects() {
  const scrollY = window.scrollY;

  // ヘッダーの背景色変更
  const header = document.querySelector('.header');
  if (scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  }

  // スクロールトップボタンの表示/非表示
  if (scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// 画像の遅延読み込み（Lazy Loading）
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// コンソールメッセージ
console.log('🎵 平泉ジャズフェスティバル2025 🎵');
console.log('世界遺産の地でジャズを楽しもう！');
console.log('2025年10月19日（土）開催');
