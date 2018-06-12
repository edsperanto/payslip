const InputForm = () => (<form>
    <div id="input_title">{`Employee #`}</div>
    <div>
        <label>Name: </label>
        <input onChange={ e => {
            e.preventDefault();
            
        } }>
        </input>
    </div>
</form>);

export default InputForm;
