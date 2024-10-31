export function navigate(screen){
    let base_host = window.location.href.split('#')[0];
    window.location.href = base_host+`#/${screen}`;
}