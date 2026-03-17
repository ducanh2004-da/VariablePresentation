import React, { useState, useEffect } from 'react';

const Presentation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealStep, setRevealStep] = useState(0); // State quản lý việc hiển thị từng phần (đáp án)
  const [isAnimating, setIsAnimating] = useState(false); // State để trigger animation

  const slides = [
    {
      title: "Cú F5 Hack Não 🔄",
      content: "Khi chúng ta ấn F5 1 video YouTube thì con số nào sẽ nhảy lên liên tục?",
    },
    {
      title: "Máy tính ghi nhớ bằng cách nào? 🧠",
      content: "",
    },
    {
      title: "Khái niệm nền tảng: Biến (Variable) 📦",
      content: "Tưởng tượng biến như 1 chiếc hộp có dán nhãn tên là 'view'. Ban đầu hộp chứa số 9. Khi bạn ấn xem video, ta mở hộp lấy số 9 cộng thêm 1 thành 10, rồi lại cất trở lại vào hộp.\n Chiếc hộp biến đó hoạt động y hệt như chính cái giá trị mà nó đang cất giữ",
    },
    {
      title: "Phần 1: Sự đa dạng của Biến (Data Types)",
      content: "- Number (Con số): 0, 1, 2...\n- String (Chuỗi/Chữ cái): tên, màu sắc...\n- Boolean (Đúng/Sai): True/ False",
      code: `// Chữ cái (String)\nlet color = "Yellow";\nlet lastName = "Johnson";\n\n// Con số (Number)\nlet length = 16;\nlet weight = 7.5;\n\n// Đúng/Sai (Boolean)\nlet x = true;\nlet y = false;`
    },
    {
      title: "Phần 2: Khởi tạo và gán giá trị cho chiếc hộp 🛠️",
      content: "Sử dụng các từ khóa: let, const, var để khởi tạo biến. \n\n Để thay đổi giá trị trong 'chiếc hộp' biến, ta dùng toán tử gán là dấu bằng (=).\n💡 Nguyên tắc vàng: Khi đem ra tính toán, biến sẽ hoạt động y hệt như chính cái giá trị mà nó đang cất giữ.",
      code: `let age; // Tạo chiếc hộp trống tên 'age'
age = 20; // Gán giá trị 20 vào hộp

let birthYear = 2026 - age; `,
    },
    {
      title: "Phần 3: Var, Let, Const - Ba người bạn đồng hành 🧑‍🤝‍🧑",
      content: "Để quản lý tốt hơn những chiếc hộp biến, chúng ta có 3 người bạn đồng hành: 'var', 'let' và 'const'. Mỗi người có cách quản lý và bảo vệ chiếc hộp khác nhau."
    },
    {
      title: "Kẻ phá bĩnh: 'var' 🦖",
      content: "Var có 2 tật xấu:\n1. Cho phép khai báo trùng tên\n 2. Phạm vi lộn xộn",
      code: `// Var cho phép trùng tên biến\nvar view = 9;\nvar view = 10; // view bị ghi đè \n\n// Var có phạm vi lộn xộn\nif (true) {\n  var x = 5;\n}\nconsole.log(x); // Vẫn in ra 5`
    },
    {
      title: "Người hùng: 'let' 🛡️",
      content: "Để giải quyết vấn đề đó, 'let' ra đời!\n\n - Nếu trùng tên biến: Báo lỗi ngay lập tức => không khởi tạo lần nữa nếu dùng let.\n - Ngoài phạm vi hàng rào {}: Không sử dụng được.\n",
      code: `// Let không cho phép trùng tên biến\nlet view = 9;\nlet view = 10; // Báo lỗi: Identifier 'view' has already been declared\n\n// Let có phạm vi rõ ràng\nif (true) {\n  let x = 5;\n}\nconsole.log(x); // Báo Lỗi: x is not defined`
    },
    {
      title: "Két sắt: 'const' 🔒",
      content: "An toàn như 'let' nhưng khác ở chỗ: Không thể thay đổi hay gán lại giá trị.\n\n Thường dùng cho hằng số toán học (số PI) hoặc các dữ liệu bất di bất dịch.",
      code: `// Const không cho phép thay đổi giá trị\nconst PI = 3.14;\nPI = 3.14159; // Báo Lỗi: Assignment to constant variable`
    },
    {
      title: "Mini-game: Hỏi xoáy đáp xoay 🌪️",
      content: "Are you ready?",
      // Đưa câu hỏi và đáp án vào mảng để xử lý click hiện từng bước
      interactiveData: [
        {
          question: "1. Trạng thái 'Đang online' hay 'Đã offline' của bạn bè trên FB?",
          answer: "=> Đáp án: LET ✅"
        },
        {
          question: "2. Các thông số về tọa độ cố định trên Google Maps?",
          answer: "=> Đáp án: CONST 🔒"
        }
      ],
    }
  ];

  const currentSlide = slides[currentStep];
  const maxReveal = currentSlide.interactiveData ? currentSlide.interactiveData.length : 0;

  // Xử lý chuyển slide & hiệu ứng
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNextAction = () => {
    // Nếu slide hiện tại có phần ẩn (đáp án) và chưa hiện hết -> Hiện tiếp
    if (revealStep < maxReveal) {
      setRevealStep(revealStep + 1);
    } 
    // Nếu đã hiện hết hoặc không có phần ẩn -> Chuyển slide tiếp theo
    else if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
      setRevealStep(0); // Reset số bước hiện tại cho slide mới
    }
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation(); 
    if (revealStep > 0) {
      setRevealStep(revealStep - 1); // Lùi lại phần ẩn (ẩn đáp án đi)
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setRevealStep(0);
    }
  };

  // --- Styles ---
  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#1e2125', // Nền tối làm nổi bật nội dung
      backgroundImage: 'radial-gradient(circle at center, #2a2e35 0%, #1e2125 100%)',
      color: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      cursor: 'pointer',
      padding: '0 5%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    },
    contentBox: {
      backgroundColor: 'rgba(30, 33, 38, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '50px',
      borderRadius: '16px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
      maxWidth: '900px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transform: isAnimating ? 'translateY(15px)' : 'translateY(0)',
      opacity: isAnimating ? 0 : 1,
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Animation mượt
    },
    title: {
      color: '#61dafb', 
      fontSize: '2.8rem',
      marginBottom: '25px',
      borderBottom: '2px solid rgba(97, 218, 251, 0.2)',
      paddingBottom: '15px',
      fontWeight: '700'
    },
    text: {
      fontSize: '1.4rem',
      lineHeight: '1.8',
      whiteSpace: 'pre-line',
      color: '#e9ecef'
    },
    interactiveBox: {
      marginTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    questionBlock: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      padding: '15px 20px',
      borderRadius: '8px',
      borderLeft: '4px solid #61dafb'
    },
    questionText: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '10px'
    },
    answerText: {
      fontSize: '1.4rem',
      color: '#4ade80', // Màu xanh lá cho đáp án
      fontWeight: 'bold',
      animation: 'fadeInUp 0.3s ease-out'
    },
    codeBlock: {
      backgroundColor: '#111315',
      color: '#a6e22e',
      padding: '25px',
      borderRadius: '10px',
      fontFamily: '"Fira Code", monospace',
      fontSize: '1.1rem',
      marginTop: '25px',
      whiteSpace: 'pre-wrap',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
    },
    note: {
      color: '#adb5bd',
      fontSize: '1.1rem',
      fontStyle: 'italic',
      marginTop: '35px',
      display: 'inline-block',
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: '8px 15px',
      borderRadius: '20px'
    },
    footer: {
      position: 'absolute',
      bottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      maxWidth: '900px',
      color: '#6c757d',
      fontSize: '1.1rem'
    },
    button: {
      padding: '12px 24px',
      fontSize: '1rem',
      backgroundColor: 'white',
      color: '#36b1d3',
      border: '1px solid #61dafb',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s',
      zIndex: 10 // Đảm bảo nút click được
    }
  };

  return (
    <>
      {/* Inject một chút CSS cho hiệu ứng hiện đáp án */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          button:hover {
            background-color: #61dafb !important;
            color: #1e2125 !important;
          }
        `}
      </style>

      <div style={styles.container} onClick={handleNextAction}>
        <div style={styles.contentBox}>
          <h1 style={styles.title}>{currentSlide.title}</h1>
          <p style={styles.text}>{currentSlide.content}</p>

          {/* Render phần Mini-game có tương tác */}
          {currentSlide.interactiveData && (
            <div style={styles.interactiveBox}>
              {currentSlide.interactiveData.map((item, index) => (
                <div key={index} style={styles.questionBlock}>
                  <div style={styles.questionText}>{item.question}</div>
                  {/* Chỉ hiện đáp án khi revealStep vượt qua index của câu hỏi */}
                  {revealStep > index && (
                    <div style={styles.answerText}>{item.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {currentSlide?.code && (
            <pre style={styles.codeBlock}>
              {currentSlide.code}
            </pre>
          )}

          {currentSlide?.note && (
            <div style={styles.note}>{currentSlide.note}</div>
          )}
        </div>

        <div style={styles.footer}>
          <button 
            style={{...styles.button, opacity: currentStep === 0 && revealStep === 0 ? 0.3 : 1}} 
            onClick={handlePrevSlide}
            disabled={currentStep === 0 && revealStep === 0}
          >
            &larr; Quay lại
          </button>
          <span>Slide {currentStep + 1} / {slides.length}</span>
        </div>
      </div>
    </>
  );
};

export default Presentation;