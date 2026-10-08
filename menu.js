document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    // Get current filename, default to index.html if root
    let currentPath = window.location.pathname.split("/").pop();
    if (!currentPath) currentPath = "index.html";

    const menuItems = [
        { href: "index.html", icon: "🏠", text: "INÍCIO" },
        { href: "perfil.html", icon: "👤", text: "MEU PERFIL" },
        { href: "meus-cursos.html", icon: "📚", text: "DOCUMENTOS" },
        { href: "pendencias.html", icon: "⚠️", text: "PENDÊNCIAS" },
        { href: "declaracoes.html", icon: "📄", text: "DECLARAÇÕES" },
        { href: "oportunidades.html", icon: "💼", text: "OPORTUNIDADES" },
        { href: "Atividades.html", icon: "🎓", text: "ATIVIDADES" },
        { href: "bolsas.html", icon: "💰", text: "BOLSAS" },
        { href: "programas.html", icon: "📋", text: "PROGRAMAS" },
        { href: "assistente.html", icon: "🤖", text: "ASSISTENTE" },
        { href: "avisos.html", icon: "🔔", text: "AVISOS" }
    ];

    let navHtml = '<nav class="menu" aria-label="Menu Principal">\n';
    menuItems.forEach(item => {
        const isActive = currentPath === item.href;
        const activeClass = isActive ? ' active' : '';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';
        navHtml += `
            <a href="${item.href}" class="menu-item${activeClass}"${ariaCurrent}>
                <span aria-hidden="true">${item.icon}</span>
                <span>${item.text}</span>
            </a>\n`;
    });
    navHtml += '</nav>';

    // =====================================================
    // CABEÇALHO: 2 imagens acima das abas + título central
    // Troque os caminhos abaixo pelos arquivos das suas imagens.
    // =====================================================
    const LOGO_1 = "src/probem_verde.png";
    const LOGO_2 = "src/ovg_verde.png";
    const TITULO = "Central de Informações do Beneficiário";

    // Se a imagem não carregar em "src/...", tenta na mesma pasta da página
    // (caso os HTML estejam dentro da própria pasta src).
    const brandHtml = `
        <div class="brand brand-images">
            <img src="${LOGO_1}" alt="ProBem"
                 onerror="this.onerror=null;this.src='${LOGO_1.split('/').pop()}'">
            <img src="${LOGO_2}" alt="OVG"
                 onerror="this.onerror=null;this.src='${LOGO_2.split('/').pop()}'">
        </div>
    `;

    const footerHtml = `
        <div class="sidebar-footer">
            Juntos pelo<br>seu futuro! 🚀
        </div>
    `;

    sidebar.innerHTML = brandHtml + navHtml + footerHtml;

    // Título centralizado no topo
    const topbar = document.querySelector(".topbar");
    if (topbar && !topbar.querySelector(".topbar-title")) {
        const title = document.createElement("h1");
        title.className = "topbar-title";
        title.textContent = TITULO;
        topbar.insertBefore(title, topbar.firstChild);
    }

    // Estilos do cabeçalho (injetados aqui para valer em todas as páginas)
    const style = document.createElement("style");
    style.textContent = `
        .sidebar .brand.brand-images {
            gap: 8px;
            padding: 0 14px;
            justify-content: center;
        }
        .brand-images img {
            flex: 1 1 0;
            min-width: 0;
            max-width: 50%;
            max-height: 62px;
            object-fit: contain;
        }

        .topbar { position: relative; }
        .topbar-title {
            position: absolute;
            left: calc(50% - 145px); /* centro da tela inteira (compensa a sidebar) */
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            max-width: 55%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            font-size: var(--fs-2xl, 28px);
            font-weight: 600;
            color: #816BAE;
            pointer-events: none;
        }

        @media (max-width: 1050px) {
            .topbar-title { left: calc(50% - 120px); }
        }
        @media (max-width: 1200px) {
            .topbar-title { font-size: var(--fs-lg, 18px); }
        }
        @media (max-width: 900px) {
            .topbar-title { display: none; }
        }
        @media (max-width: 620px) {
            .brand-images img:nth-child(2) { display: none; }
            .brand-images img { max-width: 100%; }
        }
    `;
    style.textContent += `
        .sidebar { background: linear-gradient(180deg,#2e2250 0%,#211842 100%) !important; }
        .menu-item.active, .menu-item:hover { background: #816BAE !important; }
        .topbar { border-bottom: 3px solid transparent; border-image: linear-gradient(90deg,#816BAE,#F081B3,#F8D838,#A8C858) 1; }
        .notification span { background: #F081B3 !important; color: #2e2250 !important; }
        .avatar { background: #816BAE !important; color: #fff !important; }
        .sidebar-footer { color: #F8D838 !important; }
    `;
    document.head.appendChild(style);
});
