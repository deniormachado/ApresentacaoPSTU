#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # silencia o log no terminal

if __name__ == '__main__':
    print('Servidor rodando em http://localhost:8080')
    HTTPServer(('', 8080), NoCacheHandler).serve_forever()
