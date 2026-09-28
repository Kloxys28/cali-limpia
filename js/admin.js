// Cali Limpia - Lógica del Panel Administrativo
// Versión de demostración

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
});

function loadStats() {
    const consultas = JSON.parse(localStorage.getItem('caliLimpia_consultas') || '[]');

    // Total consultas
    document.getElementById('totalConsultas').textContent = consultas.length;

    if (consultas.length === 0) {
        return;
    }

    // Barrios únicos
    const barriosUnicos = new Set(consultas.map(c => c.barrio));
    document.getElementById('totalBarrios').textContent = barriosUnicos.size;

    // Tipos únicos
    const tiposUnicos = new Set(consultas.map(c => c.tipoResiduo));
    document.getElementById('totalTipos').textContent = tiposUnicos.size;

    // Gráfico de barrios
    renderBarChart('barriosChart', getBarriosData(consultas));

    // Gráfico de tipos
    renderBarChart('tiposChart', getTiposData(consultas));

    // Historial
    renderHistorial(consultas);
}

function getBarriosData(consultas) {
    const counts = {};
    consultas.forEach(c => {
        counts[c.barrio] = (counts[c.barrio] || 0) + 1;
    });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
}

function getTiposData(consultas) {
    const counts = {};
    consultas.forEach(c => {
        counts[c.tipoResiduo] = (counts[c.tipoResiduo] || 0) + 1;
    });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1]);
}

function renderBarChart(containerId, data) {
    const container = document.getElementById(containerId);

    if (data.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No hay datos suficientes.</p>';
        return;
    }

    const maxValue = Math.max(...data.map(([, count]) => count));

    container.innerHTML = data.map(([label, count]) => {
        const percentage = (count / maxValue) * 100;
        return `
            <div class="bar-item">
                <span class="bar-label">${label}</span>
                <div class="bar-wrapper">
                    <div class="bar-fill" style="width: ${percentage}%">
                        ${count}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderHistorial(consultas) {
    const container = document.getElementById('historialConsultas');

    if (consultas.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No hay consultas registradas.</p>';
        return;
    }

    const recentConsultas = consultas.slice(-10).reverse();

    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: var(--primary-color); color: white;">
                    <th style="padding: 0.8rem; text-align: left;">Fecha</th>
                    <th style="padding: 0.8rem; text-align: left;">Barrio</th>
                    <th style="padding: 0.8rem; text-align: left;">Tipo de Residuo</th>
                </tr>
            </thead>
            <tbody>
                ${recentConsultas.map((c, i) => `
                    <tr style="background: ${i % 2 === 0 ? '#f9f9f9' : 'white'};">
                        <td style="padding: 0.8rem; border-bottom: 1px solid var(--border-color);">${formatDate(c.fecha)}</td>
                        <td style="padding: 0.8rem; border-bottom: 1px solid var(--border-color);">${c.barrio}</td>
                        <td style="padding: 0.8rem; border-bottom: 1px solid var(--border-color);">${getTipoLabel(c.tipoResiduo)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getTipoLabel(tipo) {
    const labels = {
        escombros: 'Escombros de construcción',
        muebles: 'Muebles viejos',
        electrodomesticos: 'Electrodomésticos',
        poda: 'Restos de poda',
        voluminosos: 'Residuos voluminosos',
        otros: 'Otros'
    };
    return labels[tipo] || tipo;
}
