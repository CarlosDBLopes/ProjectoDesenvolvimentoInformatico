import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      menu_idioma_titulo: "Selecionar Idioma",

      // --- TÍTULOS ---
      tab_despensa: "A Minha Despensa",
      tab_inicio: "Início",
      tab_compras: "Lista de Compras",

      // --- DASHBOARD ---
      dash_ola: "Olá, {{nome}}!",
      dash_tem: "Tem ",
      dash_alertas: " alerta(s) hoje",
      dash_percentagem: "Tem {{percent}}% dos itens\ndentro do prazo!",
      dash_a_expirar: "A Expirar",
      dash_nada_expirar: "Nada a expirar!",
      dash_expirados: "Expirados",
      dash_nada_expirado: "Nada expirado!",
      dash_carregando: "a carregar...",

      // --- DESPENSA ---
      desp_pesquisar: "Procurar na despensa...",
      desp_col_imagem: "Imagem",
      desp_col_produto: "Produto",
      desp_col_qtd: "Qtd.",
      desp_col_estado: "Estado",
      desp_nada_encontrado: "Nenhum produto encontrado!",
      desp_vazia: "A sua despensa está vazia!",

      // --- COMPRAS ---
      comp_pesquisar: "Procurar na lista...",
      comp_col_produto: "Produto",
      comp_col_qtd: "Qtd.",
      comp_nada_encontrado: "Nenhum produto encontrado!",
      comp_vazia: "A sua lista de compras está vazia!",

      // --- PERFIL ---
      perf_voltar: "Voltar",
      perf_titulo: "O Meu Perfil",
      perf_nome: "Nome",
      perf_email: "Email",
      perf_btn_alterar_pass: "Alterar Password",
      perf_btn_logout: "Terminar Sessão",
      perf_nova_pass: "Nova Password",
      perf_nova_pass_ph: "Mínimo 6 caracteres",
      perf_conf_pass: "Confirmar Nova Password",
      perf_conf_pass_ph: "Repita a nova password",
      perf_btn_atualizar: "Atualizar Password",
      perf_erro_nova_vazia: "Por favor, insira a nova password!",
      perf_erro_nova_curta: "A password deve ter pelo menos 6 caracteres!",
      perf_erro_conf_vazia: "Por favor, confirme a nova password!",
      perf_erro_conf_diferente: "As passwords não coincidem!",
      perf_erro_pass_igual: "A nova password não pode ser igual à atual!",
      perf_sucesso_alterada: "A sua password foi alterada!",
      perf_erro_sair: "Erro ao sair",

      // --- MODAIS ---
      mod_add_lista: "Adicionar à Lista",
      mod_edit_produto: "Editar Produto",
      mod_add_despensa: "Adicionar à Despensa",
      mod_tirar_foto_erro: "É necessária permissão para aceder à câmara!",
      mod_escolher_galeria_erro:
        "É necessária permissão para aceder à galeria!",
      mod_nome: "Nome do Produto *",
      mod_nome_ex: "Ex: Leite",
      mod_nome_erro: "Por favor, insira o nome do produto!",
      mod_marca: "Marca do Produto (Opcional)",
      mod_marca_ex: "Ex: Mimosa",
      mod_qtd: "Quantidade",
      mod_validade: "Data de Validade",
      mod_validade_ex: "DD/MM/AAAA",
      mod_btn_guardar: "Guardar Alterações",
      mod_btn_eliminar: "Eliminar",

      // --- ALERTAS E MENUIMAGEM ---
      alert_atencao: "Atenção",
      alert_cancelar: "Cancelar",
      alert_eliminar: "Eliminar",
      perm_titulo: "Permissão Necessária",
      perm_agora_nao: "Agora Não",
      perm_abrir_def: "Abrir Definições",
      menu_add_foto: "Adicionar Foto",
      menu_tirar_foto: "Tirar Foto",
      menu_escolher_galeria: "Escolher da Galeria",
      msg_remover_despensa:
        'Tem a certeza que pretende remover "{{nome}}" da despensa?',
      msg_remover_compras:
        'Tem a certeza que pretende remover "{{nome}}" da lista de compras?',
      msg_titulo_eliminar: "Eliminar Produto",
      msg_titulo_remover_lista: "Remover da Lista",

      // --- TOASTS ---
      toast_erro: "Erro",
      toast_sucesso: "Sucesso!",
      toast_eliminado: "Eliminado",
      toast_sessao_invalida: "Sessão inválida!",
      toast_erro_carregar_despensa: "Não foi possível carregar a despensa.",
      toast_aviso_imagem: "Aviso de Imagem",
      toast_aviso_imagem_msg:
        "A imagem não foi guardada, mas o produto será gravado.",
      toast_erro_atualizar_produto: "Não foi possível atualizar o produto.",
      toast_sucesso_atualizar_despensa: "Produto atualizado na despensa.",
      toast_erro_guardar_produto: "Não foi possível guardar o produto!",
      toast_sucesso_add_despensa: "Adicionado à despensa.",
      toast_erro_eliminar_produto: "Não foi possível eliminar o produto.",
      toast_sucesso_eliminar_despensa: "O produto foi removido da despensa.",
      toast_erro_carregar_compras:
        "Não foi possível carregar a lista de compras.",
      toast_sucesso_atualizar_compras: "Produto atualizado.",
      toast_erro_add_lista: "Não foi possível adicionar à lista!",
      toast_sucesso_add_lista: "Adicionado à lista de compras.",
      toast_erro_alterar_estado: "Não foi possível alterar o estado.",
      toast_erro_eliminar_lista: "Não foi possível eliminar da lista.",
      toast_sucesso_eliminar_lista: "O item foi removido da lista.",

      // --- AUTENTICAÇÃO (LOGIN) ---
      auth_login_subtitulo: "A sua despensa na palma da mão.",
      auth_email: "Email",
      auth_pass: "Palavra-Passe",
      auth_esqueceu: "Esqueceu-se da palavra-passe?",
      auth_entrar: "Entrar",
      auth_sem_conta: "Ainda não tem conta? ",
      auth_registe_se: "Registe-se aqui",
      auth_erro_email_vazio: "Por favor, insira o seu email!",
      auth_erro_email_invalido: "O formato do email é inválido!",
      auth_erro_pass_vazia: "Por favor, insira a sua palavra-passe!",
      auth_erro_credenciais:
        "Credenciais inválidas! Verifique o seu email e palavra-passe.",
      auth_sucesso_login: "Sessão iniciada com sucesso.",
      auth_bem_vindo: "Bem-vindo!",

      // --- AUTENTICAÇÃO (REGISTAR) ---
      auth_voltar_login: "Voltar para Login",
      auth_reg_titulo: "Criar Conta",
      auth_reg_subtitulo: "Junte-se a nós e organize a sua despensa.",
      auth_reg_nome_ph: "Nome (ex: Tiago)",
      auth_reg_pass_conf_ph: "Confirmar Palavra-Passe",
      auth_reg_btn: "Registar",
      auth_erro_nome_vazio: "Por favor, insira o seu nome!",
      auth_erro_pass_cria: "Por favor, crie uma palavra-passe!",
      auth_erro_pass_curta: "A palavra-passe deve ter pelo menos 6 caracteres!",
      auth_erro_conf_pass_vazia: "Por favor, confirme a sua palavra-passe!",
      auth_erro_pass_nao_coincidem: "As palavras-passe não coincidem!",
      auth_erro_email_registo:
        "Este email já está registado. Por favor, faça login!",
      auth_erro_criar_perfil:
        "A conta foi criada, mas falhou ao guardar o seu nome!",
      auth_sucesso_conta_criada: "Conta Criada!",
      auth_sucesso_bem_vindo: "Bem-vindo à DespensaSmart.",

      // --- AUTENTICAÇÃO (RECUPERARPASSWORD) ---
      auth_rec_titulo: "Recuperar Palavra-Passe",
      auth_rec_subtitulo:
        "Insira o seu email e será enviado um link para definir uma nova palavra-passe.",
      auth_rec_email_ph: "O seu Email",
      auth_rec_btn: "Enviar Link de Recuperação",
      auth_erro_email_valido: "Por favor, insira um email válido!",
      auth_sucesso_email_enviado: "Email Enviado!",
      auth_sucesso_verifique_caixa: "Verifique a sua caixa de entrada.",
    },
  },
  en: {
    translation: {
      menu_idioma_titulo: "Select Language",

      // --- TÍTULOS ---
      tab_despensa: "My Pantry",
      tab_inicio: "Home",
      tab_compras: "Shopping List",

      // --- DASHBOARD ---
      dash_ola: "Hello, {{nome}}!",
      dash_tem: "You have ",
      dash_alertas: " alert(s) today",
      dash_percentagem:
        "You have {{percent}}% of your items\nwithin the expiration date!",
      dash_a_expirar: "Expiring Soon",
      dash_nada_expirar: "Nothing expiring!",
      dash_expirados: "Expired",
      dash_nada_expirado: "Nothing expired!",
      dash_carregando: "loading...",

      // --- DESPENSA ---
      desp_pesquisar: "Search in the pantry...",
      desp_col_imagem: "Image",
      desp_col_produto: "Product",
      desp_col_qtd: "Qty",
      desp_col_estado: "Status",
      desp_nada_encontrado: "No products found!",
      desp_vazia: "Your pantry is empty!",

      // --- COMPRAS ---
      comp_pesquisar: "Search in the list...",
      comp_col_produto: "Product",
      comp_col_qtd: "Qty",
      comp_nada_encontrado: "No products found!",
      comp_vazia: "Your shopping list is empty!",

      // --- PERFIL ---
      perf_voltar: "Back",
      perf_titulo: "My Profile",
      perf_nome: "Name",
      perf_email: "Email",
      perf_btn_alterar_pass: "Change Password",
      perf_btn_logout: "Logout",
      perf_nova_pass: "New Password",
      perf_nova_pass_ph: "Minimum 6 characters",
      perf_conf_pass: "Confirm New Password",
      perf_conf_pass_ph: "Repeat new password",
      perf_btn_atualizar: "Update Password",
      perf_erro_nova_vazia: "Please enter the new password!",
      perf_erro_nova_curta: "Password must be at least 6 characters!",
      perf_erro_conf_vazia: "Please confirm the new password!",
      perf_erro_conf_diferente: "Passwords do not match!",
      perf_erro_pass_igual:
        "New password cannot be the same as the current one!",
      perf_sucesso_alterada: "Your password has been changed!",
      perf_erro_sair: "Error logging out",

      // --- MODAIS ---
      mod_add_lista: "Add to List",
      mod_edit_produto: "Edit Product",
      mod_add_despensa: "Add to Pantry",
      mod_tirar_foto_erro: "Permission is required to access the camera!",
      mod_escolher_galeria_erro:
        "Permission is required to access the gallery!",
      mod_nome: "Product Name *",
      mod_nome_ex: "E.g.: Milk",
      mod_nome_erro: "Please enter the product name!",
      mod_marca: "Product Brand (Optional)",
      mod_marca_ex: "E.g.: Nestle",
      mod_qtd: "Quantity",
      mod_validade: "Expiration Date",
      mod_validade_ex: "DD/MM/YYYY",
      mod_btn_guardar: "Save Changes",
      mod_btn_eliminar: "Delete",

      // --- ALERTAS E MENUIMAGEM ---
      alert_atencao: "Warning",
      alert_cancelar: "Cancel",
      alert_eliminar: "Delete",
      perm_titulo: "Permission Required",
      perm_agora_nao: "Not Now",
      perm_abrir_def: "Open Settings",
      menu_add_foto: "Add Photo",
      menu_tirar_foto: "Take Photo",
      menu_escolher_galeria: "Choose from Gallery",
      msg_remover_despensa:
        'Are you sure you want to remove "{{nome}}" from the pantry?',
      msg_remover_compras:
        'Are you sure you want to remove "{{nome}}" from the shopping list?',
      msg_titulo_eliminar: "Delete Product",
      msg_titulo_remover_lista: "Remove from List",

      // --- TOASTS ---
      toast_erro: "Error",
      toast_sucesso: "Success!",
      toast_eliminado: "Deleted",
      toast_sessao_invalida: "Invalid session!",
      toast_erro_carregar_despensa: "Could not load the pantry.",
      toast_aviso_imagem: "Image Warning",
      toast_aviso_imagem_msg: "Image wasn't saved, but the product will be.",
      toast_erro_atualizar_produto: "Could not update the product.",
      toast_sucesso_atualizar_despensa: "Product updated in the pantry.",
      toast_erro_guardar_produto: "Could not save the product!",
      toast_sucesso_add_despensa: "Added to the pantry.",
      toast_erro_eliminar_produto: "Could not delete the product.",
      toast_sucesso_eliminar_despensa: "Product removed from the pantry.",
      toast_erro_carregar_compras: "Could not load the shopping list.",
      toast_sucesso_atualizar_compras: "Product updated.",
      toast_erro_add_lista: "Could not add to the list!",
      toast_sucesso_add_lista: "Added to the shopping list.",
      toast_erro_alterar_estado: "Could not change the status.",
      toast_erro_eliminar_lista: "Could not delete from the list.",
      toast_sucesso_eliminar_lista: "Item removed from the list.",

      // --- AUTENTICAÇÃO (LOGIN) ---
      auth_login_subtitulo: "Your pantry in the palm of your hand.",
      auth_email: "Email",
      auth_pass: "Password",
      auth_esqueceu: "Forgot your password?",
      auth_entrar: "Login",
      auth_sem_conta: "Don't have an account yet? ",
      auth_registe_se: "Register here",
      auth_erro_email_vazio: "Please enter your email!",
      auth_erro_email_invalido: "Invalid email format!",
      auth_erro_pass_vazia: "Please enter your password!",
      auth_erro_credenciais:
        "Invalid credentials! Check your email and password.",
      auth_sucesso_login: "Logged in successfully.",
      auth_bem_vindo: "Welcome!",

      // --- AUTENTICAÇÃO (REGISTAR) ---
      auth_voltar_login: "Back to Login",
      auth_reg_titulo: "Create Account",
      auth_reg_subtitulo: "Join us and organize your pantry.",
      auth_reg_nome_ph: "Name (e.g., James)",
      auth_reg_pass_conf_ph: "Confirm Password",
      auth_reg_btn: "Register",
      auth_erro_nome_vazio: "Please enter your name!",
      auth_erro_pass_cria: "Please create a password!",
      auth_erro_pass_curta: "Password must be at least 6 characters!",
      auth_erro_conf_pass_vazia: "Please confirm your password!",
      auth_erro_pass_nao_coincidem: "Passwords do not match!",
      auth_erro_email_registo:
        "This email is already registered. Please login!",
      auth_erro_criar_perfil: "Account created, but failed to save your name!",
      auth_sucesso_conta_criada: "Account Created!",
      auth_sucesso_bem_vindo: "Welcome to DespensaSmart.",

      // --- AUTENTICAÇÃO (RECUPERARPASSWORD) ---
      auth_rec_titulo: "Recover Password",
      auth_rec_subtitulo:
        "Enter your email and a link will be sent to set a new password.",
      auth_rec_email_ph: "Your Email",
      auth_rec_btn: "Send Recovery Link",
      auth_erro_email_valido: "Please enter a valid email!",
      auth_sucesso_email_enviado: "Email Sent!",
      auth_sucesso_verifique_caixa: "Check your inbox.",
    },
  },
  es: {
    translation: {
      menu_idioma_titulo: "Seleccionar Idioma",

      // --- TÍTULOS ---
      tab_despensa: "Mi Despensa",
      tab_inicio: "Inicio",
      tab_compras: "Lista de Compras",

      // --- DASHBOARD ---
      dash_ola: "¡Hola, {{nome}}!",
      dash_tem: "Tienes ",
      dash_alertas: " alerta(s) hoy",
      dash_percentagem:
        "¡Tienes el {{percent}}% de los artículos\ndentro del plazo!",
      dash_a_expirar: "Por Expirar",
      dash_nada_expirar: "¡Nada por expirar!",
      dash_expirados: "Expirados",
      dash_nada_expirado: "¡Nada expirado!",
      dash_carregando: "cargando...",

      // --- DESPENSA ---
      desp_pesquisar: "Buscar en la despensa...",
      desp_col_imagem: "Imagen",
      desp_col_produto: "Producto",
      desp_col_qtd: "Cant.",
      desp_col_estado: "Estado",
      desp_nada_encontrado: "¡Ningún producto encontrado!",
      desp_vazia: "¡Tu despensa está vacía!",

      // --- COMPRAS ---
      comp_pesquisar: "Buscar en la lista...",
      comp_col_produto: "Producto",
      comp_col_qtd: "Cant.",
      comp_nada_encontrado: "¡Ningún producto encontrado!",
      comp_vazia: "¡Tu lista de compras está vacía!",

      // --- PERFIL ---
      perf_voltar: "Volver",
      perf_titulo: "Mi Perfil",
      perf_nome: "Nombre",
      perf_email: "Correo",
      perf_btn_alterar_pass: "Cambiar Contraseña",
      perf_btn_logout: "Cerrar Sesión",
      perf_nova_pass: "Nueva Contraseña",
      perf_nova_pass_ph: "Mínimo 6 caracteres",
      perf_conf_pass: "Confirmar Nueva Contraseña",
      perf_conf_pass_ph: "Repita la nueva contraseña",
      perf_btn_atualizar: "Actualizar Contraseña",
      perf_erro_nova_vazia: "¡Por favor, introduzca la nueva contraseña!",
      perf_erro_nova_curta: "¡La contraseña debe tener al menos 6 caracteres!",
      perf_erro_conf_vazia: "¡Por favor, confirme la nueva contraseña!",
      perf_erro_conf_diferente: "¡Las contraseñas no coinciden!",
      perf_erro_pass_igual:
        "¡La nueva contraseña no puede ser igual a la actual!",
      perf_sucesso_alterada: "¡Su contraseña ha sido cambiada!",
      perf_erro_sair: "Error al salir",

      // --- MODAIS ---
      mod_add_lista: "Añadir a la Lista",
      mod_edit_produto: "Editar Producto",
      mod_add_despensa: "Añadir a la Despensa",
      mod_tirar_foto_erro: "¡Se necesita permiso para acceder a la cámara!",
      mod_escolher_galeria_erro:
        "¡Se necesita permiso para acceder a la galería!",
      mod_nome: "Nombre del Producto *",
      mod_nome_ex: "Ej: Leche",
      mod_nome_erro: "¡Por favor, introduzca el nombre del producto!",
      mod_marca: "Marca del Producto (Opcional)",
      mod_marca_ex: "Ej: Pascual",
      mod_qtd: "Cantidad",
      mod_validade: "Fecha de Caducidad",
      mod_validade_ex: "DD/MM/AAAA",
      mod_btn_guardar: "Guardar Cambios",
      mod_btn_eliminar: "Eliminar",

      // --- ALERTAS E MENUIMAGEM ---
      alert_atencao: "Atención",
      alert_cancelar: "Cancelar",
      alert_eliminar: "Eliminar",
      perm_titulo: "Permiso Requerido",
      perm_agora_nao: "Ahora No",
      perm_abrir_def: "Abrir Ajustes",
      menu_add_foto: "Añadir Foto",
      menu_tirar_foto: "Tomar Foto",
      menu_escolher_galeria: "Elegir de la Galería",
      msg_remover_despensa:
        '¿Estás seguro de que deseas eliminar "{{nome}}" de la despensa?',
      msg_remover_compras:
        '¿Estás seguro de que deseas eliminar "{{nome}}" de la lista de compras?',
      msg_titulo_eliminar: "Eliminar Producto",
      msg_titulo_remover_lista: "Eliminar de la Lista",

      // --- TOASTS ---
      toast_erro: "Error",
      toast_sucesso: "¡Éxito!",
      toast_eliminado: "Eliminado",
      toast_sessao_invalida: "¡Sesión inválida!",
      toast_erro_carregar_despensa: "No se pudo cargar la despensa.",
      toast_aviso_imagem: "Aviso de Imagen",
      toast_aviso_imagem_msg: "La imagen no se guardó, pero el producto sí.",
      toast_erro_atualizar_produto: "No se pudo actualizar el producto.",
      toast_sucesso_atualizar_despensa: "Producto actualizado en la despensa.",
      toast_erro_guardar_produto: "¡No se pudo guardar el producto!",
      toast_sucesso_add_despensa: "Añadido a la despensa.",
      toast_erro_eliminar_produto: "No se pudo eliminar el producto.",
      toast_sucesso_eliminar_despensa:
        "El producto fue removido de la despensa.",
      toast_erro_carregar_compras: "No se pudo cargar la lista de compras.",
      toast_sucesso_atualizar_compras: "Producto actualizado.",
      toast_erro_add_lista: "¡No se pudo añadir a la lista!",
      toast_sucesso_add_lista: "Añadido a la lista de compras.",
      toast_erro_alterar_estado: "No se pudo cambiar el estado.",
      toast_erro_eliminar_lista: "No se pudo eliminar de la lista.",
      toast_sucesso_eliminar_lista: "El artículo fue removido de la lista.",

      // --- AUTENTICAÇÃO (LOGIN) ---
      auth_login_subtitulo: "Tu despensa en la palma de tu mano.",
      auth_email: "Correo",
      auth_pass: "Contraseña",
      auth_esqueceu: "¿Olvidaste tu contraseña?",
      auth_entrar: "Entrar",
      auth_sem_conta: "¿Aún no tienes cuenta? ",
      auth_registe_se: "Regístrate aquí",
      auth_erro_email_vazio: "¡Por favor, introduzca su correo!",
      auth_erro_email_invalido: "¡El formato del correo es inválido!",
      auth_erro_pass_vazia: "¡Por favor, introduzca su contraseña!",
      auth_erro_credenciais:
        "¡Credenciales inválidas! Verifique su correo y contraseña.",
      auth_sucesso_login: "Sesión iniciada con éxito.",
      auth_bem_vindo: "¡Bienvenido!",

      // --- AUTENTICAÇÃO (REGISTAR) ---
      auth_voltar_login: "Volver al Login",
      auth_reg_titulo: "Crear Cuenta",
      auth_reg_subtitulo: "Únete a nosotros y organiza tu despensa.",
      auth_reg_nome_ph: "Nombre (ej: Diego)",
      auth_reg_pass_conf_ph: "Confirmar Contraseña",
      auth_reg_btn: "Registrarse",
      auth_erro_nome_vazio: "¡Por favor, introduzca su nombre!",
      auth_erro_pass_cria: "¡Por favor, cree una contraseña!",
      auth_erro_pass_curta: "¡La contraseña debe tener al menos 6 caracteres!",
      auth_erro_conf_pass_vazia: "¡Por favor, confirme su contraseña!",
      auth_erro_pass_nao_coincidem: "¡Las contraseñas no coinciden!",
      auth_erro_email_registo:
        "Este correo ya está registrado. ¡Por favor, inicie sesión!",
      auth_erro_criar_perfil:
        "¡La cuenta fue creada, pero falló al guardar su nombre!",
      auth_sucesso_conta_criada: "¡Cuenta Creada!",
      auth_sucesso_bem_vindo: "Bienvenido a DespensaSmart.",

      // --- AUTENTICAÇÃO (RECUPERARPASSWORD) ---
      auth_rec_titulo: "Recuperar Contraseña",
      auth_rec_subtitulo:
        "Introduzca su correo y se enviará un enlace para definir una nueva contraseña.",
      auth_rec_email_ph: "Su Correo",
      auth_rec_btn: "Enviar Enlace de Recuperación",
      auth_erro_email_valido: "¡Por favor, introduzca un correo válido!",
      auth_sucesso_email_enviado: "¡Correo Enviado!",
      auth_sucesso_verifique_caixa: "Revise su bandeja de entrada.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
