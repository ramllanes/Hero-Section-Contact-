const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        }else {
            entry.target.classList.remove("show");
        }
    });
});

const Sample = document.getElementById('Sample1');
const Sample1 = document.getElementById('sample2');
const Sample2 = document.querySelectorAll('.Sample');
const Sample3 = document.querySelectorAll('.programming-icon');

observer.observe(Sample1)
observer.observe(Sample)

Sample2.forEach((el) => {
    observer.observe(el);
});

Sample3.forEach((el) => {
    observer.observe(el);
})


const contact = document.getElementById('contact-form')

observer.observe(contact);


const Desc = document.querySelectorAll('.explain')


Desc.forEach((el) => {
    observer.observe(el)
})