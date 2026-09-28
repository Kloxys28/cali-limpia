#!/usr/bin/env python3
"""Servidor para Cali Limpia - Listo para despliegue en Render"""

import http.server
import socketserver
import os
import base64

# Puerto dinámico asignado por Render (o 3000 en local)
PORT = int(os.environ.get('PORT', 3000))

# Credenciales del panel admin (desde variables de entorno)
ADMIN_USER = os.environ.get('ADMIN_USER', 'admin')
ADMIN_PASS = os.environ.get('ADMIN_PASS', 'cambia-esto-en-produccion')

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # Silenciar logs

    def do_GET(self):
        # Proteger /admin.html y /js/admin.js
        if self.path.startswith('/admin') or self.path.startswith('/js/admin'):
            if not self.authenticate():
                return
        return super().do_GET()

    def authenticate(self):
        auth_header = self.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Basic '):
            self.send_auth_required()
            return False

        try:
            encoded = auth_header.split(' ')[1]
            decoded = base64.b64decode(encoded).decode('utf-8')
            username, password = decoded.split(':', 1)

            if username == ADMIN_USER and password == ADMIN_PASS:
                return True
        except Exception:
            pass

        self.send_auth_required()
        return False

    def send_auth_required(self):
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm="Cali Limpia Admin"')
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        html = '''
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><title>Acceso restringido</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 3rem;">
            <h1>Acceso restringido</h1>
            <p>Este panel requiere autenticación.</p>
        </body>
        </html>
        '''
        self.wfile.write(html.encode('utf-8'))

os.chdir(os.path.dirname(os.path.abspath(__file__)))

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), AuthHandler) as httpd:
    print(f"🌿 Cali Limpia corriendo en puerto {PORT}")
    print(f"   Panel admin protegido con autenticación")
    httpd.serve_forever()
