/**
 * Every word and the hand-picked "featured" photos live here so the whole
 * site can be re-worded or re-shot in one place. All copy is in Vietnamese.
 */

// Hand-picked from the 154-photo set for the storytelling sections.
// The gallery still shows all photos.
export const featured = {
  hero: "HDK-5511", // #128 — warm smile, chin on hand, reading
  story: [
    "HDK-5410", // full body, eyes lowered — elegant
    "HDK-5450", // close-up beauty, eye contact
    "HDK-5515", // serene profile at the piano
    "HDK-5530", // intimate close-up, reading
  ],
  birthday: "HDK-5475", // soft, candlelit
  moon: "HDK-5538", // gazing upward — fits "to the moon"
  // The 24 hand-picked scrapbook photos, in display order (chosen via the picker).
  // Source of truth for the gallery AND for which images get deployed.
  gallery: [
    "HDK-5401", "HDK-5410", "HDK-5420", "HDK-5425", "HDK-5423", "HDK-5430",
    "HDK-5434", "HDK-5441", "HDK-5444", "HDK-5449", "HDK-5458", "HDK-5459",
    "HDK-5466", "HDK-5482", "HDK-5492", "HDK-5502", "HDK-5511", "HDK-5514",
    "HDK-5516", "HDK-5519", "HDK-5526", "HDK-5531", "HDK-5536", "HDK-5501",
  ],
} as const;

export const content = {
  hero: {
    eyebrow: "Một món quà nhỏ",
    name: "Nguyễn Ngọc Trang Anh",
    tagline: "Người con gái dịu dàng nhất trong thế giới của anh.",
    scrollCue: "Kéo xuống nhé",
  },
  story: {
    eyebrow: "Em, trong mắt anh",
    lines: [
      "Có những điều rất khẽ…",
      "…mà ở lại thật lâu.",
      "Như cách em bước vào đời anh — dịu dàng tựa nắng sớm.",
      "Mỗi khoảnh khắc bên em, anh đều muốn giữ lại mãi.",
    ],
  },
  birthday: {
    eyebrow: "Ngày đặc biệt",
    date: "20.05",
    title: "Chúc mừng sinh nhật em yêu",
    message:
      "Cảm ơn em vì đã đến giữa thế gian này, và vì đã chọn ở bên anh. Mong từng ngày của em đều ngập tràn hoa thơm và ánh nắng.",
  },
  gallery: {
    eyebrow: "Bộ sưu tập",
    title: "Khoảnh khắc của em",
    hint: "Chạm vào ảnh để xem rõ hơn",
  },
  love: {
    eyebrow: "Điều anh muốn nói",
    teaser: "Có một điều anh luôn giữ trong tim…",
    openCta: "Chạm để mở",
    headline: "Love you to the moon and back",
    vi: "Yêu em — đến tận mặt trăng, rồi vòng trở lại.",
    sign: "— Mãi là của em",
  },
  footer: {
    line: "Dành riêng cho em, Trang Anh.",
    made: "Làm bằng cả trái tim",
  },
} as const;
