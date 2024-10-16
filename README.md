# Workflow

## Como fazer atualizações do projeto

- Recomendo que tenham baixado no VSCode a extensão Auto Open Markdown Preview (ele abre o README dentro do vscode ao abrir o arquivo)

### 1. Preparar o ambiente:

```sh
git init
git remote add origin https://github.com/DSM2SEM2024/-workflow.git
git config --local user.name "Seu nome"
git config --local user.email "Seu email DO GITHUB"
```
#

### 2. Baixar a ramificação (branch) principal, e criar uma nova ramificação
```sh
git pull origin main
git branch -m "prefixo/nome"
```

- feature/nome se for uma função/código
- docs/nome se for um documento
- fix/nome se for uma correção

Exemplo:
```sh
git branch -m feature/professor_repository
git branch -m docs/class_diagram
git branch -m fix/namespace
```

#

### 3. Após fazer suas alterações, tente puxar da branch main para garantir que está tudo em dia, então adicionar com um comentário e subir a sua branch :)
```sh
git pull origin main
git add *
git commit -m "Comentário do que você fez"
git push origin prefixo/nome
```

- Esse nome da branch tem que ser o mesmo que você definiu.

#

### 4. Crie um pull-request da branch que você criou depois de terminar tudo.

Isso você fará no próprio site do github, no repositorio da branch, no botão ***CONTRIBUTE*** e aguarde :D

- Me coloque como Reviewer (revisor) do Pull Request, e associe o Pull Request ao projeto Workflow conforme o print de exemplo (segunda imagem)

![Captura de tela do repositório remoto no Github, com ênfase no botão de criar Pull-Request](./docs/readme/image1.png)

#

![Captura de tela do repositório remoto no Github, na tela de Pull Request](./docs/readme/image2.png)