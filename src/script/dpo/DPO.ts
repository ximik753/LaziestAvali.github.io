import {Modal} from './modal';
import {Course, CourseStates, CourseWithState, Department} from '../../types/dpo.types';

export class DPO {
    departments: Department
    card: Course[] = []
    currentCourse: Course | CourseWithState
    currentCourseKey: string
    modal: Modal = new Modal()
    HTMLElements: {
        removeBtn: HTMLButtonElement,
        scrollToFormBtn: HTMLButtonElement,
        sendBtn: HTMLButtonElement,
        creds: HTMLElement,
        phoneNumber: HTMLElement,
    } = {
        removeBtn: null,
        scrollToFormBtn: null,
        sendBtn: null,
        creds: null,
        phoneNumber: null,
    }

    constructor(dpoObj: Department) {
        this.departments = dpoObj

        this.setCourseKey(0)
        this.renderCircles()
        this.renderCourseBlocks()

        this.modal.buttonHandler(this.addToCard.bind(this))

        this.findHtmlElements()
        this.addListenerToButtons()
        this.addLestenerToForm();
    }

    findHtmlElements() {
        this.HTMLElements.removeBtn = document.querySelector('.button-wrap .remove')
        this.HTMLElements.scrollToFormBtn = document.querySelector('.button-wrap .send')
        this.HTMLElements.sendBtn = document.querySelector('.form input[type="submit"]')
        this.HTMLElements.creds = document.getElementById('fio');
        this.HTMLElements.phoneNumber = document.getElementById('number');
    }

    setCourseKey(index: number) {
        this.currentCourseKey = Object.keys(this.departments)[index]
    }

    clickAndEnterListener(el: any, cb: Function) {
        el.addEventListener('click', cb)

        el.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                cb()
            }
        })
    }

    renderCircles() {
        const circles: NodeListOf<HTMLDivElement> = document.querySelectorAll('.circle')

        const circleClickHandler = (key: string, idx: number) => {
            circles.forEach(item => item.classList.remove('selected'))
            circles[idx].classList.add('selected')
            this.currentCourseKey = key
            this.renderCourseBlocks()
        }

        // Устанавливаем название отделений из объекта + настройки
        Object.keys(this.departments).forEach((key, idx) => {
            const currentCircle = circles[idx]
            currentCircle.textContent = key

            currentCircle.style.backgroundColor = this.departments[key].options.circleColor

            // Добавляем прослушку событий на каждый из элементов отделения
            circles[idx].addEventListener('click', () => {
                circleClickHandler(key, idx)
            })

            // Прослушка событий при нажатии на Enter
            this.clickAndEnterListener(circles[idx], () => circleClickHandler(key, idx))
        })
    }

    renderCourseTemplate(course: Course, courseState?: CourseStates) {
        return `
            <div class="course ${courseState ? `with-state ${courseState}` : ''}" tabindex="0">
                 <p class="course__text">${course.title}</p>
                 <div class="course__img" style="background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${course.image}') center / cover;"></div>
            </div>
        `
    }

    renderCourseBlocks() {
        const clickHandler = (course: Course) => {
            this.currentCourse = course
            this.modal.setContent(course)
        }

        const wrap = document.querySelector('.all-course .course-wrap')

        // render elements
        wrap.innerHTML = this.departments[this.currentCourseKey].items.map(item => this.renderCourseTemplate(item)).join('')

        // add listeners
        wrap.querySelectorAll('.course').forEach((course, index) => {
            const clickFn = () => clickHandler(this.departments[this.currentCourseKey].items[index])

            this.clickAndEnterListener(course, clickFn)
        })
    }

    addToCard() {
        if (this.card.filter(itemInCard => itemInCard.title === this.currentCourse.title).length > 0) {
            return
        }

        this.changeStateButton(true)

        this.card.push({...this.currentCourse, courseState: this.modal.courseState} as CourseWithState)
        this.renderSelectedCourse()
    }

    renderSelectedCourse() {
        const totalPrice = this.card.reduce<number>((acc, item: CourseWithState) => acc + item.price, 0) || 0
        const $selectedWrap = document.querySelector('.selected-course .course-wrap')
        $selectedWrap.innerHTML = this.card.map((item: CourseWithState) => this.renderCourseTemplate(item, item.courseState)).join('')

        $selectedWrap.querySelectorAll('.course').forEach((course, idx) => {
            this.clickAndEnterListener((course), () => {
                if (confirm('Вы хотите удалить данный курс из корзины?')) {
                    this.card.splice(idx, 1)
                    this.renderSelectedCourse()
                }
            })
        })

        // insert in form

        const $priceItem = document.querySelector('.total-price')
        $priceItem.textContent = totalPrice.toString()
        const formCourseUl = document.querySelector('.form-course')
        formCourseUl.innerHTML = ''
        if (this.card.length === 0) {
            formCourseUl.textContent = 'Не выбран ни один курс'
        }
        this.card.map((item: CourseWithState) => {
            const li = document.createElement('li')
            // li.textContent = `${item.title} (${item.courseState === CourseStates.regular ? 'Обычный' : 'Продвинутый'} уровень)`
            li.textContent = `${item.title}`
            formCourseUl.appendChild(li)
        })
    }

    changeStateButton(allow?: boolean) {
        const btns = [this.HTMLElements.scrollToFormBtn, this.HTMLElements.sendBtn]

        if (allow) {
            btns.forEach((btn) => {
                btn.classList.remove('not-allowed')
                btn.classList.add('accent')
            })
        } else {
            btns.forEach((btn) => {
                btn.classList.add('not-allowed')
                btn.classList.remove('accent')
            })
        }
    }

    addLestenerToForm() {
        const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head><title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <style type="text/css">body, html { margin: 0px; padding: 0px; -webkit-font-smoothing: antialiased; text-size-adjust: none; width: 100% !important; }table td, table { }#outlook a { padding: 0px; }.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }.ExternalClass { width: 100%; }@media only screen and (max-width: 480px) {
           table tr td table.edsocialfollowcontainer {width: auto !important;} table, table tr td, table td { width: 100% !important; }
          img { width: inherit; }
          .layer_2 { max-width: 100% !important; }
          .edsocialfollowcontainer table { max-width: 25% !important; }
          .edsocialfollowcontainer table td { padding: 10px !important; }
          .edsocialfollowcontainer table { max-width: 25% !important; }
          .edsocialfollowcontainer table td { padding: 10px !important; }
        }</style>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
        </head><body style="padding:0; margin: 0;background: #f5f6f8" data-new-gr-c-s-check-loaded="14.1121.0" data-gr-ext-installed="" data-new-gr-c-s-loaded="14.1121.0">
        <table style="height: 100%; width: 100%; background-color: #f5f6f8;" align="center">
        <tbody><tr><td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #f5f6f8;">
        <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 640px; box-sizing: border-box; width: 100%; margin: 0px auto;">
        <tbody><tr><td class="drow" valign="top" align="center" style="background-color: #e6eee9; box-sizing: border-box; font-size: 0px; text-align: center;"><div class="layer_2" style="max-width: 640px; display: inline-block; vertical-align: top; width: 100%;">
        <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 32px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
        <p class="style1 text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
        <strong><span style="color: #00a727;">Ярославский промышленно-экономический колледж им. Н.П.Пастухова</span></strong></p></td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #e6eee9; box-sizing: border-box; font-size: 0px; text-align: center;">
        <div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="breakline" style="padding:0"><p style="border-style: solid none none; border-width: 4px 0px 0px; margin: 8px; border-top-color: #00a727; padding: 0px;">&nbsp;</p>
        </td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr>
        <td valign="top" class="edtext" style="padding: 32px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;"><span style="font-size: 28px; color: #000000;">Заявка на получение дополнительного профессионального образования</span>
        </p></td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;">
        <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="breakline" style="padding:0"><p style="border-style: solid none none; border-width: 4px 0px 0px; margin: 8px; border-top-color: #dddddd; padding: 0px;">&nbsp;</p></td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
        <div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 32px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
        <p style="margin: 0px; padding: 0px;"><strong><span style="font-size: 20px; color: #10a15c;">Заявитель:</span></strong> <span style="font-size: 20px; color: #000000;">{{fio}}</span></p><p style="margin: 0px; padding: 0px;"><span style="font-size: 20px; color: #000000;"><span style="color: #10a15c;"><strong>Группа:</strong></span> {{group}}</span></p>
        <p style="margin: 0px; padding: 0px;"><span style="font-size: 20px; color: #000000;"><span style="color: #10a15c;"><strong>Номер телефона:</strong></span> {{number}}</span></p></td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="breakline" style="padding:0"><p style="border-style: solid none none; border-width: 4px 0px 0px; margin: 8px; border-top-color: #dddddd; padding: 0px;">&nbsp;</p></td></tr></tbody></table></div></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 640px;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 32px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;">
        <strong><span style="font-size: 18px; color: #10a15c;">Выбранные курсы:</span></strong></p>
        {{cards}}
        </td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table></body></html>`
        this.HTMLElements.sendBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if ((document.getElementById('fio') as HTMLInputElement).value.trim().length == 0 ||
                (document.getElementById('number') as HTMLInputElement).value.trim().length == 0 ||
                (document.getElementById('group') as HTMLInputElement).value.trim().length == 0
            ) return;
            let list = document.createElement('ul');
            this.card.map((item: CourseWithState) => {
                const li = document.createElement('li'); //<li><span style="color: #000000; font-size: 18px;">Разработка мобильных приложений</span></li>
                const span = document.createElement('span');
                span.style.color = '#000000';
                span.style.fontSize = '18px';
                span.textContent = `${item.title}`;
                li.appendChild(span);
                list.appendChild(li);
            });
            Email.send({
                SecureToken: '75f2d424-bf5f-47bf-92fa-fbc7b022bfb3',
                To: "helga@ypec.ru",
                From: "helga@ypec.ru",
                Subject: `Заявка ДПО (${(document.getElementById('fio') as HTMLInputElement).value})`,
                Body: template.replace('{{fio}}', (document.getElementById('fio') as HTMLInputElement).value).replace('{{number}}', (document.getElementById('number') as HTMLInputElement).value).replace('{{group}}', (document.getElementById('group') as HTMLInputElement).value).replace('{{cards}}', list.outerHTML)
            }).then((message: any) => console.log(message));
            alert('Заявка успешно отпрвлена!');
            location.reload();
        })
    }

    addListenerToButtons() {
        this.changeStateButton()

        this.HTMLElements.removeBtn.addEventListener('click', () => {
            if (confirm('Вы действительно хотите удалить все выбранные курсы?')) {
                this.card = []
                this.renderSelectedCourse()
                this.changeStateButton()
            }
        })

        this.HTMLElements.scrollToFormBtn.addEventListener('click', function() {
            if (this.classList.contains('not-allowed')) {
                return
            }

            const el = document.querySelector('form.form')
            const fioInput: HTMLInputElement = document.querySelector('input#fio')
            el.scrollIntoView({block: 'center', behavior: 'smooth'})
            fioInput.focus()
        })
    }
}