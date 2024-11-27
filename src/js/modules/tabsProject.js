function tabsProject() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(item => {
        makeTabs(item);
    })
    
    function makeTabs(container) {
        const buttons = container.querySelectorAll('.buttons div'); 
        const contents = container.querySelectorAll('.content');
    
        function showTab(i=0) {
            buttons.forEach(item => {
                item.classList.remove('active');
            })
            contents.forEach(item => {
                item.classList.remove('active');
            })
            buttons[i].classList.add('active');
            contents[i].classList.add('active');
        }
        showTab();
    
            buttons.forEach((but,i)=> {
                but.addEventListener('click', () => {
                    showTab(i);
                })
            })
    
    }
}

export default tabsProject;