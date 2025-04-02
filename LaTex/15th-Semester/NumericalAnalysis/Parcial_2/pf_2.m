function [N, xn, fm, E] = pf(x0, Tol, niter, A)
    % Método de Punto Fijo para la ecuación:
    % f(x) = (A*10^-2 / 8)*cos(x - A*10^-3) - x = 0
    %
    % Entradas:
    %    x0    -> Valor inicial
    %    Tol   -> Tolerancia deseada
    %    niter -> Máximo número de iteraciones
    %    A     -> Parámetro (en el problema, A = 510)
    %
    % Salidas:
    %    N  -> Vector con los índices de iteración
    %    xn -> Aproximaciones de la raíz en cada iteración
    %    fm -> Valores de f(x_n)
    %    E  -> Errores |x_{n+1} - x_n|

    syms x

    % Definición de f y g para el método de punto fijo:
    % f(x) = (A*10^-2 / 8)*cos(x - A*10^-3) - x
    % g(x) = (A*10^-2 / 8)*cos(x - A*10^-3)
    f_expr = (A*10^-2 / 8)*cos(x - A*10^-3) - x; 
    g_expr = (A*10^-2 / 8)*cos(x - A*10^-3);

    % Inicialización de contadores y vectores
    c = 0;
    xn(c+1) = x0;
    fm(c+1) = double(subs(f_expr, x, x0));
    E(c+1) = Tol + 1;      % Un valor mayor que Tol para entrar al bucle
    N(c+1) = c;

    % Impresión de encabezado
    disp('      n                Xn                   f(Xn)                   Error')

    % Bucle de iteración
    while (E(c+1) > Tol) && (fm(c+1) ~= 0) && (c < niter)
        % Siguiente aproximación
        xnew = double(subs(g_expr, x, x0));

        % Evaluamos f en la nueva aproximación
        fnew = double(subs(f_expr, x, xnew));

        % Calculamos el error
        err = abs(xnew - x0);

        % Actualizamos contadores y almacenamos
        c = c + 1;
        xn(c+1) = xnew;
        fm(c+1) = fnew;
        E(c+1) = err;
        N(c+1) = c;

        % Mostramos la fila de la iteración
        fprintf('%7d    %18.8f    %18.8f    %18.8f\n', c, xnew, fnew, err);

        % Preparamos la siguiente
        x0 = xnew;
    end

    % Mensajes finales según criterio
    if fm(c+1) == 0
        fprintf('\n=> %f es raíz de f(x).\n', x0);
    elseif E(c+1) < Tol
        fprintf('\n=> %f es aproximación de la raíz con tolerancia %g.\n', x0, Tol);
    else
        fprintf('\n=> Fracasó en %d iteraciones sin cumplir la tolerancia.\n', niter);
    end

end
