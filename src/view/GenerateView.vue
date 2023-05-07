<template>
    <div>
        <div>Podaj nazwę zboru</div>
        <input type="text" />
        <div>Podaj numer identyfikatora</div>
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <div>Podaj numer rejestracyjny pojazdu</div>
        <input type="text" />
        <div class="form-check">
            <input type="checkbox" class="form-check-input" />
            <label class="form-check-label">Będę używał różnych pojazdów</label>
        </div>
        <div>Piątek: <input type="text" /></div>
        <div>Sobota: <input type="text" /></div>
        <div>Niedziela: <input type="text" /></div>

        <button class="btn btn-primary">Generuj identyfikator do wydruku</button>
    </div>
</template>