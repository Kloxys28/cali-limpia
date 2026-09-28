// Cali Limpia - Lógica del Chatbot
// Versión de demostración

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // Estado de la conversación
    let conversationState = {
        step: 'barrio', // 'barrio' | 'tipo_residuo' | 'finalizado'
        barrio: null,
        tipoResiduo: null
    };

    // Inicializar: enfocar el input
    userInput.focus();

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        // Mostrar mensaje del usuario
        addMessage(message, 'user');
        userInput.value = '';

        // Procesar mensaje
        processMessage(message);
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Convertir texto a HTML con saltos de línea
        const paragraphs = text.split('\n').filter(p => p.trim());
        paragraphs.forEach(p => {
            const pElement = document.createElement('p');
            pElement.textContent = p;
            contentDiv.appendChild(pElement);
        });

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll al final
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processMessage(message) {
        const lowerMessage = message.toLowerCase();

        switch (conversationState.step) {
            case 'barrio':
                handleBarrioStep(lowerMessage);
                break;
            case 'tipo_residuo':
                handleTipoResiduoStep(lowerMessage);
                break;
            case 'finalizado':
                handleFinalizadoStep(lowerMessage);
                break;
        }
    }

    function handleBarrioStep(message) {
        // Buscar si el mensaje contiene un barrio conocido
        const barrioEncontrado = BARRIOS.find(barrio => 
            message.includes(barrio.toLowerCase())
        );

        if (barrioEncontrado) {
            conversationState.barrio = barrioEncontrado;
            conversationState.step = 'tipo_residuo';

            addMessage(
                `¡Perfecto! Estás en el barrio ${barrioEncontrado}. 📍\n\n` +
                `Ahora, ¿qué tipo de residuo necesitas recoger?\n\n` +
                `Puedes elegir entre:\n` +
                `• Escombros de construcción\n` +
                `• Muebles viejos\n` +
                `• Electrodomésticos\n` +
                `• Restos de poda\n` +
                `• Residuos voluminosos\n` +
                `• Otros`,
                'bot'
            );
        } else {
            addMessage(
                `No reconozco ese barrio. Por favor, escribe el nombre de un barrio de Cali.\n\n` +
                `Algunos ejemplos: San Antonio, Granada, Versalles, San Fernando, Centro, etc.`,
                'bot'
            );
        }
    }

    function handleTipoResiduoStep(message) {
        // Buscar tipo de residuo por palabras clave
        let tipoEncontrado = null;

        for (const [tipo, palabras] of Object.entries(PALABRAS_CLAVE)) {
            if (palabras.some(palabra => message.includes(palabra))) {
                tipoEncontrado = tipo;
                break;
            }
        }

        // También buscar coincidencia directa con los tipos
        if (!tipoEncontrado) {
            const tipos = Object.keys(RESPUESTAS);
            tipoEncontrado = tipos.find(tipo => message.includes(tipo)) || null;
        }

        if (tipoEncontrado) {
            conversationState.tipoResiduo = tipoEncontrado;
            conversationState.step = 'finalizado';

            // Guardar consulta
            saveConsulta();

            // Mostrar respuesta
            const respuesta = RESPUESTAS[tipoEncontrado];
            let responseText = `${respuesta.titulo}\n\n${respuesta.descripcion}\n\nRecomendaciones:\n`;
            respuesta.recomendaciones.forEach(rec => {
                responseText += `• ${rec}\n`;
            });

            addMessage(responseText, 'bot');

            // Mostrar empresas verificadas si existen
            const empresas = EMPRESAS[tipoEncontrado];
            if (empresas && empresas.length > 0) {
                setTimeout(() => {
                    addEmpresasMessage(empresas, tipoEncontrado);
                }, 300);
            } else {
                setTimeout(() => {
                    addMessage(respuesta.advertencia, 'bot');
                }, 300);
            }

            // Mensaje de cierre
            setTimeout(() => {
                addMessage(
                    `¿Necesitas ayuda con algo más? Escribe "sí" para continuar o "no" para finalizar.`,
                    'bot'
                );
            }, 800);
        } else {
            addMessage(
                `No entendí qué tipo de residuo necesitas. Por favor, elige uno de estos:\n\n` +
                `• Escombros de construcción\n` +
                `• Muebles viejos\n` +
                `• Electrodomésticos\n` +
                `• Restos de poda\n` +
                `• Residuos voluminosos\n` +
                `• Otros`,
                'bot'
            );
        }
    }

    function handleFinalizadoStep(message) {
        if (message.includes('sí') || message.includes('si')) {
            conversationState = {
                step: 'barrio',
                barrio: null,
                tipoResiduo: null
            };
            addMessage(
                `¡Con gusto! ¿En qué barrio o zona de Cali te encuentras?`,
                'bot'
            );
        } else {
            addMessage(
                `¡Gracias por usar Cali Limpia! 🌿\n\n` +
                `Recuerda: Esta es una versión de demostración. La información proporcionada es ficticia y solo con fines ilustrativos.\n\n` +
                `¡Que tengas un buen día!`,
                'bot'
            );
        }
    }

    function addEmpresasMessage(empresas, tipoResiduo) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content empresas-content';

        const titleP = document.createElement('p');
        titleP.innerHTML = '<strong>📋 Empresas verificadas en Cali:</strong>';
        contentDiv.appendChild(titleP);

        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'empresas-cards';

        empresas.forEach(empresa => {
            const card = document.createElement('div');
            card.className = 'empresa-card';

            const nameH4 = document.createElement('h4');
            nameH4.textContent = empresa.nombre;
            card.appendChild(nameH4);

            const descP = document.createElement('p');
            descP.textContent = empresa.descripcion;
            card.appendChild(descP);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'empresa-buttons';

            // Botón de llamada
            if (empresa.telefono) {
                const cleanPhone = empresa.telefono.replace(/[^\d]/g, '');
                const callBtn = document.createElement('a');
                callBtn.href = `tel:${cleanPhone}`;
                callBtn.className = 'btn btn-call';
                callBtn.innerHTML = `📞 ${empresa.telefono}`;
                buttonsDiv.appendChild(callBtn);
            }

            // Botón de ubicación
            if (empresa.direccion) {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(empresa.direccion + ', Cali, Colombia')}`;
                const locationBtn = document.createElement('a');
                locationBtn.href = mapsUrl;
                locationBtn.target = '_blank';
                locationBtn.className = 'btn btn-location';
                locationBtn.innerHTML = '📍 Ver en mapa';
                buttonsDiv.appendChild(locationBtn);
            }

            card.appendChild(buttonsDiv);

            const sourceP = document.createElement('p');
            sourceP.className = 'empresa-source';
            sourceP.textContent = `Fuente: ${empresa.fuente}`;
            card.appendChild(sourceP);

            cardsContainer.appendChild(card);
        });

        contentDiv.appendChild(cardsContainer);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function saveConsulta() {
        const consultas = JSON.parse(localStorage.getItem('caliLimpia_consultas') || '[]');
        consultas.push({
            fecha: new Date().toISOString(),
            barrio: conversationState.barrio,
            tipoResiduo: conversationState.tipoResiduo
        });
        localStorage.setItem('caliLimpia_consultas', JSON.stringify(consultas));
    }
});
