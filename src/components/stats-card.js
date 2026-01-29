<!-- ===================================
     COMPONENTE: Stats Card
     Tarjeta de estadísticas
     =================================== -->

export function statsCard(){
return `
<div class="stats-card">
    <div class="stats-icon" data-color="green">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11l3 3L22 4" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </div>
    <div class="stats-content">
        <div class="stats-label">Total Orders</div>
        <div class="stats-value">1,245</div>
    </div>
</div>

`
}