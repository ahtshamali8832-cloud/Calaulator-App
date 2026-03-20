(function () {
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.button');
    let expr = '';

    function update() {
        output.textContent = expr || '0';
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-value');
            if (!val) return;

            if (val === 'C') {
                expr = '';
                update();
                return;
            }

            if (val === 'DEL') {
                expr = expr.slice(0, -1);
                update();
                return;
            }

            if (val === '=') {
                try {
                    if (!/^[0-9+\-*/.() ]*$/.test(expr)) {
                        expr = 'Error';
                    } else {
                        expr = String(eval(expr));
                    }
                } catch (e) {
                    expr = 'Error';
                }
                update();
                return;
            }

            // Prevent leading operator
            if (/^[+\-*/.]$/.test(val) && expr === '') return;

            // Replace operator if last char is operator
            if (/^[+\-*/.]$/.test(val) && /[+\-*/.]$/.test(expr)) {
                expr = expr.slice(0, -1) + val;
            } else {
                expr += val;
            }

            update();
        });
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        const key = e.key;
        if ((/^[0-9]$/.test(key)) || key === '.') {
            expr += key; update(); return;
        }
        if (key === 'Enter') { e.preventDefault(); document.querySelector('[data-value="="]').click(); return; }
        if (key === '+' || key === '-' || key === '*' || key === '/') { expr += key; update(); return; }
        if (key === 'Backspace') { expr = expr.slice(0, -1); update(); return; }
        if (key === 'Escape') { expr = ''; update(); return; }
    });

    // initial render
    update();
})();