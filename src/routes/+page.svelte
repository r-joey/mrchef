<script>
    import markdownit from 'markdown-it'
    import { enhance } from '$app/forms'
    export let form
    
    
    
    
    const md = markdownit()  
    let user_form
    let isLoading
    let image_ready = false

    const handleChanges = (e) => {
        if (e.target.files.length > 0) {
            image_ready = true
        }
    }

    const handledSubmit = ( {formElement} ) => {
        isLoading = true
        return async ( {result, update}) => {
            isLoading = false
            // formElement.reset()
            user_form.reset()
            update() 
        }
    }

</script>
<div class='space-y-2'>
    <div class="flex flex-col text-center justify-center"> 
        <img src="mrchef.png" alt="mrchef">
        <h4 class="font-bold text-2xl">Mr Chef</h4>
        <p class="mx-8 text-slate-500">Upload or take a photo of your ingredients and Mr. Chef will try his best to suggest a recipe.</p>
    </div>
    <div class="flex items-center justify-center"> 
        <form method="POST" bind:this={user_form} enctype="multipart/form-data">
            <div class="join">
                <label for="raw_ingredients" class="join-item btn btn-md btn-accent">
                    {#if isLoading}
                        <span class="loading loading-spinner"></span>
                    {:else}
                        <span>
                            <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 487 487" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9 v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"></path> </g> </g> </g></svg>
                        </span>
                    {/if}
                </label>
                <input on:change={handleChanges} hidden name='raw_ingredients' id="raw_ingredients" type="file" capture="user" accept="image/*" class=" join-item file-input file-input-bordered file-input-accent w-full max-w-xs" />
                <button disabled={isLoading || !image_ready} type="submit" class="join-item btn btn-md btn-accent">Suggest</button>
            </div>
            </form>

      
    </div>

    <div class='mx-8'>
        <div class="no-tailwindcss-base">{@html md.render(form?.response ?? '')}</div>
    </div>
</div>